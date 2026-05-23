import React, { Component, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'

import { DndContext, PointerSensor, useSensor, useSensors, TouchSensor, MouseSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

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



  // onDragStart khi bắt đầu kéo
  const handleDragStart = (event) => {
    // console.log('handelDragStart', event)
    // xử lí làm overlay khi kéo thả set các giá trị của phần tử đang được kéo vào state để sử dụng cho việc hiển thị overlay và các thông tin liên quan đến phần tử đang được kéo
    setActiveDragItemId(event?.active?.id) // id của phần tủ đang kéo
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN) // type của phần tử đang kéo nếu nó có columnId là card, ngược lại là column
    setActiveDragItemData(event?.active?.data?.current) // dữ liệu của phần tử đang kéo

  }

  // onDragEnd khi kết thúc kéo thả
  const handleDragEnd = (event) => {
    /* 
      cách sử lí việc kéo thả tới vị trí nhưng column không tới dích mà vẫn ở vi trí cũ
      hướng sử lí nên dữ liệU orderedColumns ra dạng state để khi kéo thả sẽ cập nhật lại state và
      render lại component để thấy được sự thay đổi vị trí của column
    */
    // console.log('handelDragEnd', event)
    // active.id là vị trí của thằng kéo, over.id là vị trí của thằng thả
    const { active, over } = event

    if (!over) return  // nếu không tồn tại over thì không làm gì cả

    // nếu vị trí kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // console.log('keos tha')
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id) // index vị trí cũ của thănghf kéo từ active

      //  lấy vịk trí mới
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // dndOrderedColumns là mảng mới sau khi đã được sắp xếp lại theo vị trí mới sau khi kéo thả
      // dùng arrayModve để sắp xếp lại mảng columns ban đầu, 

      // const dndOrderedColumnsIds = orderedColumns.map(c => c._id)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

      // console.log('dndOrderedColumns', dndOrderedColumns)
      setOrderedColumns(dndOrderedColumns) // cập nhật lại state orderedColumns với mảng mới sau khi đã được sắp xếp lại

    }

    // sau khi thả thì set các giá trị về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

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


  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
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