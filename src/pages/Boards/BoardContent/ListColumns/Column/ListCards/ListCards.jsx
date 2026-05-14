import React from 'react'
import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  // const COLUMN_HEADER_HEIGHT = '50px'  đưa qua theme dể dùng chung cho toàn bộ 2 file
  // const COLUMN_FOOTER_HEIGHT = '56px'
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden', // ẩn thanh cuộng ngang
      overflowY: 'auto', // hiện thanh cuộn dọc khi nội dung vượt quá chiều cao của column
      maxHeight: (theme) => `calc(
                  ${theme.trello.boardContentHeight} - 
                  ${theme.spacing(5)} -
                  ${theme.trello.columnHeaderHeight} -
                  ${theme.trello.columnFooterHeight}
                )`, // chiều cao tối đa trừ đi chiều cao header và footer để ra chiều cao content

      // chỉnh sữa thanh scrossbar của content column
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf', },
    }}>
      {/* content column */}
      <Card />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      {/* <Card temporaryHeightMedia /> truyền vào 1 props temporaryHeightMedia để ẩn ảnh đi */}
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      <Card temporaryHeightMedia />
      

      {/* <Card sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography >card 01</Typography>
        </CardContent>

      </Card> */}
      
      
    </Box>
  )
}

export default ListCards