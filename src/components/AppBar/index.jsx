import React, { Component } from 'react'
import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import {ReactComponent as trelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/icons-material/Apps'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

export class AppBar extends Component {
  render() {
    return (
      <Box px={2} sx={{    // px={2} là padding left và right 16px, py={1} là padding top và bottom 8px
        width: '100%',
        // heignt: '48px',
        height: (theme) => theme.trello.appBarHeight, // sử dụng thuộc tính tự đặt trong theme,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        <Box sx={{ display:'flex', alignItems: 'center', gap :2}}>
          <AppsIcon sx={{ color: 'primary.main'}} />
          <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5}}>
            <SvgIcon component={trelloLogo} inheritViewBox fontSize='small' sx={{ color: 'primary.main'}} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main'}}>Trello</Typography> {/* mặc định của Typography là xuống dòng, nếu muốn nó nằm ngang hàng thì dùng variant='span' */}
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant='outlined'>Create</Button>
        </Box>

        <Box sx={{ display:'flex', alignItems: 'center', gap: 1}}>
          <TextField type='search' label='Search' id='outline-search' size='small' />
          <ModeSelect />

          <Tooltip title='Notifications'>
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer'}}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>

          <Tooltip title='Help'>
            <Badge color="secondary" sx={{ cursor: 'pointer'}}>
              <HelpOutlineIcon />
            </Badge>
          </Tooltip>

          <Profiles />
        </Box>

      
      </Box>
    )
  }
}

export default AppBar