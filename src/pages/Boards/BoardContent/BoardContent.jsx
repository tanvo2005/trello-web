import React, { Component } from 'react'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => (theme.trello.boardContentHeight),
      padding: '10px 0',
    }}>
      {/* <ListColumn columns={board?.columns} /> */}
      <ListColumn columns={orderedColumns} />

      {/* columns */}
    </Box>
  )
}

export default BoardContent