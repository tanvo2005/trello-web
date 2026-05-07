import React, { Component } from 'react'
import ModeSelect from '../../components/ModeSelect'
import Box from '@mui/material/Box'

export class AppBar extends Component {
  render() {
    return (
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        // heignt: '48px',
        height: (theme) => theme.trello.appBarHeight, // sử dụng thuộc tính tự đặt trong theme,
        display: 'flex',
        alignItems: 'center'
      }}>
      <ModeSelect />
      </Box>
    )
  }
}

export default AppBar