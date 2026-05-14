import React, { Component } from 'react'
import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn'

function BoardContent() {
  
  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => (theme.trello.boardContentHeight),
      padding: '10px 0',
      }}>
        <ListColumn />
        {/* column */}
      </Box>
    )
}

export default BoardContent