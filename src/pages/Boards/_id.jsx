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


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // dùng react-router-dom để lấy boardId từ URL params về
    const boardId = '6a847c49cb76665c12e66868' // fix cứng để kiểm tra thử
    // call api
    fetchBoardDetailsApi(boardId).then(board => {
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
    console.log('createdColumn: ', createdColumn)

    // cập nhật lại state board 
  }

  // gọi api toạ mới card và làm lại dữ liệu trong stateBoard
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    console.log('createdCard: ', createdCard)
    // cập nhật lại state board 
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