import React, { Component, useEffect, useState, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'

import { DndContext, PointerSensor, useSensor, useSensors, TouchSensor, MouseSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners, closestCenter, pointerWithin, rectIntersection, getFirstCollision } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

function BoardContent({ board }) {
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board]) // mỗi khi board thay đổi thì useEffect sẽ chạy lại và cập nhật lại orderedColumnState

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // activationConstraint yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  // const sensors = useSensors(pointerSensor)


  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // yêu cầu nhấn giũ 250ms và dung sai của cảm ứng là 5 thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // ưu tiên sử dụng 2 loại sensor là mouseSensor và touchSensor để hỗ trợ cả trên desktop và thiết bị di động
  const sensors = useSensors(mouseSensor, touchSensor)


  //  các hàm xử lý sự kiện kéo thả
  const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
  }

  // tại 1 thời điẻm chỉ có 1 phần tử đang được kéo là column hoặc card nên có dùng 1 state để lưu id
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // tạo 1 state riêng dể lưu trữ thông tin của column cũ đang đước kéo
  const [oldColumnCard, setOldColumnCard] = useState(null)

  // điểm va chạm cuối cùng trước đó (xử lí thuật toán phát hiện va chạm )
  const lastOverId = useRef(null)

  // funvtion chung xử lí việc cập nhật lại state trong trường hợp di chuyển chuột giữa các column khác nhau
  const moveCardBetweenDiffrentColumn = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
  ) => {
    setOrderedColumns(prevColumns => {
      // đi tìm vị trí (index) của overCard trong column đích (nơi card sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // console.log('overCardIndex', overCardIndex)

      // logic tính toán cardIndex mới (trên hoặc dưới cảu overCard) lấy ra từ code của thư viện dnd-kit
      let newCardIndex
      // rect() là hàm lấy ra vị trí cuae nó so với màn hình đẻ biểt nó pở trên hay dưới column
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // console.log('isBelowOverItem', isBelowOverItem)
      // console.log('modifier', modifier)
      // console.log('newCardIndex', newCardIndex)

      // clone mảng orderColumnState cũ ra một cái mới để xử lí dữ liệu rồi return cập nhật lại
      // orderredcolumnState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // nextActiveColumn là column cũ
      if (nextActiveColumn) {
        // xoá card ở cái column active ( có thể hiển là column cũ cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // nextOverColumn là column mới
      if (nextOverColumn) {
        // kiểM tra xem card đang kéo nó có tồn tại ở ovelColumn chưa nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // columnId là cái ID cần sữa
        // đối với trường hợp dragEnd thì ta phải cập nhật lại chuẩn dữ liệu columnId trong card sau
        // khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        console.log('rebuild_activeDraggingCardData', rebuild_activeDraggingCardData)
        // tiếp theo là thêm card đang kéo vào overColumn ở vị trí index mới
        // toSpliced(newCardIndex, 0, activeDraggingCardData) là hàm thêm phần tử vào mảng ở vị trí 
        // index mới mà không làm thay đổi mảng cũ mà trả về một mảng mới đã được cập nhật
        // dối số 1 là vị trí index mới, đối số 2 là 0 vì không xoá phần tủe nào
        // đối số 3 là phần tử cần thêm vào mảng ở vị trí index mới
        // nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)


        // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      // return một mảng mới được tạo ra từ prevColumns sau khi đã được cập nhật lại vị trí của card đang kéo (activeDraggingCardData) trong column đích (overColumn)
      return nextColumns
    })
  }


  // onDragStart khi bắt đầu kéo
  const handleDragStart = (event) => {
    // console.log('handelDragStart', event)
    // xử lí làm overlay khi kéo thả set các giá trị của phần tử đang được kéo vào state để sử dụng cho việc hiển thị overlay và các thông tin liên quan đến phần tử đang được kéo
    setActiveDragItemId(event?.active?.id) // id của phần tủ đang kéo
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN) // type của phần tử đang kéo nếu nó có columnId là card, ngược lại là column
    setActiveDragItemData(event?.active?.data?.current) // dữ liệu của phần tử đang kéo

    // nếu kéo card thì mới thực hiện hành động setOldColumnCard để lưu trữ thông tin của column cũ đang được kéo, còn nếu kéo column thì không cần thiết vì khi kéo column thì không có chuyện di chuyển qua lại giữa các column như card nên không cần lưu trữ thông tin cũ
    if (event?.active?.data?.current?.columnId) {
      setOldColumnCard(findColumnByCardId(event?.active?.id)) // tìm column cũ theo cardId của phần tử đang kéo và lưu vào state oldColumnCard

    }
  }

  // onDragEnd khi kết thúc kéo thả
  const handleDragEnd = (event) => {
    /* 
      cách sử lí việc kéo thả tới vị trí nhưng column không tới dích mà vẫn ở vi trí cũ
      hướng sử lí nên dữ liệU orderedColumns ra dạng state để khi kéo thả sẽ cập nhật lại state và
      render lại component để thấy được sự thay đổi vị trí của column
    */
    // active.id là vị trí của thằng kéo, over.id là vị trí của thằng thả
    const { active, over } = event

    // cần đảm bảo nếu như không tồn tại active hoặc không tông tạo over ( khi kéo ra khỏi phạm vi container)
    // thì không làm gì để tránh cash trang
    if (!active || !over) return

    // console.log('handelDragEnd', event)

    // xử lí kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('hành động kéo thả card tạm thời')

      // activeDraggingCard là card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard là card đang tương tác trên hoăc dưới so với cái card đang đƯợc kéo ở trên 
      const { id: overCardId } = over

      // tìm 2 cilumn theo cardID
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // nếu không tồn tại 1 trong 2 column thì không làm gì hết để tránh cash trang web
      if (!activeColumn || !overColumn) return

      // console.log('oldColumnCard', oldColumnCard)
      // console.log('overColumn', overColumn)
      // hành động kéo thả card giữa 2 column khác nhau
      /**
       * phải dùng tới activeDragItemData.columnId hoặc oldColumnCard (set vào state từ bước handelDragStart) chứ không phải
       * activeData trong scope handelDragEnd này vì sau khi qua onDragOver tới đây là state của
       * card đã cập nhật 1 lần rồi
       */
      if (oldColumnCard._id !== overColumn._id) {
        // console.log('thả card qua 2 column khác nhau')

        moveCardBetweenDiffrentColumn(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        // hành động kéo thả card trong cùng 1 column

        // lấy vị trí cũ từ thằng oldColumnCard
        const oldCardIndex = oldColumnCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //  lấy vịk trí mới từ overColumn
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        //dùng arrayMove vì kéo card trong  cùng 1 column tương tự như kéo column trong 1 content
        const dndOrderedCards = arrayMove(oldColumnCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          // clone mảng orderColumnState cũ ra một cái mới để xử lí dữ liệu rồi return cập nhật lại
          // orderredcolumnState mới
          const nextColumns = cloneDeep(prevColumns)

          // tìm tới column đang thả
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          // cập nhật lại 2 giá trị mới là cards và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // trả về giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }

    }

    // xử lí kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // nếu vị trí kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // console.log('keos tha')
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id) // index vị trí cũ của thănghf kéo từ active

        //  lấy vịk trí mới
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // dndOrderedColumns là mảng mới sau khi đã được sắp xếp lại theo vị trí mới sau khi kéo thả
        // dùng arrayModve để sắp xếp lại mảng columns ban đầu, 

        // const dndOrderedColumnsIds = orderedColumns.map(c => c._id)
        // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

        // console.log('dndOrderedColumns', dndOrderedColumns)
        setOrderedColumns(dndOrderedColumns) // cập nhật lại state orderedColumns với mảng mới sau khi đã được sắp xếp lại

      }
    }

    // sau khi thả thì set các giá trị về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnCard(null)

  }

  // hàm tìm 1 column theo cardID 
  const findColumnByCardId = (cardId) => {
    // nên dùng c.card thay vì dùng c.orderCardId bởi vì trước handelDragOver chúng ta sẽ làm dữ liệu cho
    // cards hoàn chỉnh trước rồi mới tạo ra CardOrderIds mới 
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    // di vào mảng column sau đó tìm column mà nó chứa 1 cái mảng card , dùng map mảng card để tạo 1 mảng mới
    // chứa toàn bộ id của cái card , sau đó dùng includes để kiểm tra xem mảng mới có chứa cái cardId được
    // truyền vào hay không, nếu có thì trả về column đó còn không thì trả về undefined
  }

  // trigger trong quá trình kéo drag 1 phần tủ 
  const handelDragOver = (event) => {
    // console.log('handelDragOver', event)

    // nếu đang kéo cilumn thì không làm gì
    // column đang kéo ok nên không cần đụng gì tới column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // nếu kéo card thì sử lí thêm để kéo card qua lại giữa các column
    const { active, over } = event
    // cần đảm bảo nếu như không tồn tại active hoặc không tông tạo over ( khi kéo ra khỏi phạm vi container)
    // thì không làm gì để tránh cash trang
    if (!active || !over) return

    // activeDraggingCard là card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard là card đang tương tác trên hoăc dưới so với cái card đang đƯợc kéo ở trên 
    const { id: overCardId } = over

    // tìm 2 cilumn theo cardID
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // nếu không tồn tại 1 trong 2 column thì không làm gì hết để tránh cash trang web
    if (!activeColumn || !overColumn) return

    /**
     * xử lí logic ở đây chỉ khi kéo card qua 2 column khác nhau còn nếu kéo card trong chính column ban
     * đầu của nó thì không làm gì 
     * đây là đoạn xử lí lúc kéo (handelDragOver) còn đoạn xử lí lúc thả xong (handleDragEnd) thì chưa
     */
    if (activeColumn._id !== overColumn._id) {
      // prevColumns columns trước khi cập nhật state
      // setOrderedColumns(prevColumns => {
      //   // đi tìm vị trí (index) của overCard trong column đích (nơi card sắp được thả)
      //   const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      //   // console.log('overCardIndex', overCardIndex)

      //   // logic tính toán cardIndex mới (trên hoặc dưới cảu overCard) lấy ra từ code của thư viện dnd-kit
      //   let newCardIndex
      //   // rect() là hàm lấy ra vị trí cuae nó so với màn hình đẻ biểt nó pở trên hay dưới column
      //   const isBelowOverItem = active.rect.current.translated &&
      //     active.rect.current.translated.top > over.rect.top + over.rect.height

      //   const modifier = isBelowOverItem ? 1 : 0

      //   newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //   // console.log('isBelowOverItem', isBelowOverItem)
      //   // console.log('modifier', modifier)
      //   // console.log('newCardIndex', newCardIndex)

      //   // clone mảng orderColumnState cũ ra một cái mới để xử lí dữ liệu rồi return cập nhật lại
      //   // orderredcolumnState mới
      //   const nextColumns = cloneDeep(prevColumns)
      //   const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      //   const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //   // nextActiveColumn là column cũ
      //   if (nextActiveColumn) {
      //     // xoá card ở cái column active ( có thể hiển là column cũ cái lúc mà kéo card ra khỏi nó để sang column khác)
      //     nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
      //     // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
      //     nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      //   }

      //   // nextOverColumn là column mới
      //   if (nextOverColumn) {
      //     // kiểM tra xem card đang kéo nó có tồn tại ở ovelColumn chưa nếu có thì cần xoá nó trước
      //     nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
      //     // tiếp theo là thêm card đang kéo vào overColumn ở vị trí index mới
      //     // toSpliced(newCardIndex, 0, activeDraggingCardData) là hàm thêm phần tử vào mảng ở vị trí 
      //     // index mới mà không làm thay đổi mảng cũ mà trả về một mảng mới đã được cập nhật
      //     // dối số 1 là vị trí index mới, đối số 2 là 0 vì không xoá phần tủe nào
      //     // đối số 3 là phần tử cần thêm vào mảng ở vị trí index mới
      //     nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

      //     // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
      //     nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      //   }

      //   // return một mảng mới được tạo ra từ prevColumns sau khi đã được cập nhật lại vị trí của card đang kéo (activeDraggingCardData) trong column đích (overColumn)
      //   return nextColumns
      // })

      moveCardBetweenDiffrentColumn(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }

  }

  /**
   * animation khi thả drop (phầN tủ) test bằng cách kéo xong thả trực tiếp và nhìn vào phàn giữ chổ overplay
   * 
   */
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        }
      }
    })
  }

  // custommner lại thuật toán phát hiện va chạm nâng cao để khắc phục vấn đề flickering và 
  // sai lệch dữ liệu khi kéo thả card giữa các column khác nhau. Tối ưu việc kéo thả card giữa nhiềU column
  // args = agrumnets = các đối số tham số
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // tìm các điểm giao nhau va chạm , intersection với con trỏ
    const pointerIntersections = pointerWithin(args)
    // 1 số trường hợ khi kéo ra header hoặc container thì pointerIntersections sẽ trả về mảng rổng nẻn
    // cần kiểm tra mảng rổng thì không làm gì
    if (!pointerIntersections?.length) return

    // vì lí do đã kiểm tra mảng ở trên nên doạn này khôn cần nữa 
    // thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
    // const intersections = pointerIntersections?.length > 0
    //   ? pointerIntersections
    //   : rectIntersection(args)

    // tìm id đầu tiên trong đám intersections ở trên
    // let overId = getFirstCollision(intersections, 'id')
    // tìm id đầu tiên trong đám pointerIntersections ở trên
    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      /**
       * nếu over là column thì sẽ tìm đến cardId gần nhất bên trong khu vực va chạm đó dựa vào 
       * thuật toán phát hiện va chạm closestCenter hay closestCorners đều được, tuy nhiên ở
       * đây dùng closestCorners thì mượt mà hơn
       */

      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        console.log('overId trước khi được ghi đè: ', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        console.log('overId sau khi được ghi đè: ', overId)
        // [0]?.id lấy phần tủ đầu tiên của overId ra sau khi được ghi đè
      }


      lastOverId.current = overId
      return [{ id: overId }]
    }

    // nếu overId là null thì trả về mảng rổng tránh bug cash trrang
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])


  return (
    <DndContext
      sensors={sensors}
      // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua 
      // Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
      // collisionDetection={closestCorners} // closestCorners là hàm xác định phần tử gần nhất với phần tử đang kéo để quyết định vị trí thả

      // nếu chỉ dùng closestCorners thì sẽ có bug fickering + sai lệch dữ liệu nên cần phải viết thêm
      // hàm collisionDetectionStrategy( nâng cao thuật toán phát hiện va chạm ) để khắc phục vấn đề trên
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handelDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* DndContext là vùng kéo thả 
      onDragStart khi bắt đầu kéo  */}
      <Box sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trello.boardContentHeight),
        padding: '10px 0',
      }}>
        {/* <ListColumn columns={board?.columns} /> */}
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {/* DragOverlay là phần tử hiển thị khi kéo thả, nó sẽ hiển thị phần tử đang được kéo theo con trỏ chuột 
          nếu  như không tồn tại ID và không tồn tại type và nó là null trường hợp không kéo thả gì hết
          */}
          {(!activeDragItemId || !activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>

        {/* columns */}
      </Box>
    </DndContext>
  )
}

export default BoardContent