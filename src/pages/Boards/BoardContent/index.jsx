import React, { Component } from 'react'
import Box from '@mui/material/Box'

export class BoardContent extends Component {
  render() {
    return (
      <Box sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        board content
      </Box>
    )
  }
}

export default BoardContent