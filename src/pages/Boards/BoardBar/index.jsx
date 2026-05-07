import React, { Component } from 'react'
import Box from '@mui/material/Box'

export class BoardBar extends Component {
  render() {
    return (
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight, 
        display: 'flex',
        alignItems: 'center'
      }}>
          Board bar
      </Box>
    )
  }
}
export default BoardBar