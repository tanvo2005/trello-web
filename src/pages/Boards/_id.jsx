// boards detail
import React, { useEffect } from 'react'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsApi, createNewColumnApi, createNewCardApi } from '~/apis/index'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // dùng react-router-dom để lấy boardId từ URL params về
    const boardId = '6a847c49cb76665c12e66868' // fix cứng để kiểm tra thử
    // call api
    fetchBoardDetailsApi(boardId).then(board => {

      //khi f5 trang web khi tạo column mới thì nó sẽ chưa có card , cần sử lí vấn đề kéo thả vào 1 column rỗng
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) { // nếu như column rỗng
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      console.log('board: ', board)
      setBoard(board)
    })
  }, [])

  /**
   * việc mỗi board theo cấu trúc dữ liệu sẽ chứa cả column và card vì thế api sẽ được gọi ở đây để 
   * dễ đổ dữ liệu xuống column và card , nếu gọi trực tiếp api ở column và card thì sẽ phải gọi lên 
   * ở nhiều cấp gây phiền và khó quán lý
   */

  // gọi api tạo mới column và làm lại dữ liệu  state Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })
    // console.log('createdColumn: ', createdColumn)

    // khi tạo column mới thì nó sẽ chưa có card , cần sử lí vấn đề kéo thả vào 1 column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // cập nhật lại state board 
    /**
     * ở phía FE tự làm đúng lại dữ liệu state board thay vì phải gọi lại API (fetchBoardDetailsApi)
     */
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // gọi api toạ mới card và làm lại dữ liệu trong stateBoard
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    console.log('createdCard: ', createdCard)
    // cập nhật lại state board 
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)// timf column có chứa card đang tạo
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)

  }
  return (
    // disableGutters maxWidth={false} sẽ hiển thi full màn hình không bị trình trạng pading, margin hay chiều
    // rông tối đa nữa
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>

      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
    // dấu ( ?. ) là optional chaining, nếu mockData có tồn tại thì mới lấy board, 
    // nếu không có thì sẽ trả về undefined, tránh lỗi khi truy cập vào thuộc tính của một đối tượng không tồn tại
  )
}
export default Board