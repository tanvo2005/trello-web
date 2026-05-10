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
import AddIcon from '@mui/icons-material/Add'

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
        gap: 2,
        overflowX: 'auto', // nếu nội dung vượt quá chiều rộng thì sẽ hiển thị thanh cuộn ngang
      }}>

        <Box sx={{ display:'flex', alignItems: 'center', gap :2}}>
          <AppsIcon sx={{ color: 'primary.main'}} />
          <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5}}>
            <SvgIcon component={trelloLogo}  inheritViewBox fontSize='small' sx={{ color: 'primary.main'}} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main'}}>Trello</Typography> {/* mặc định của Typography là xuống dòng, nếu muốn nó nằm ngang hàng thì dùng variant='span' */}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex'}, gap: 1}}> 
            {/* lúc này display nhận vào 1 json object
            display: { xs: 'none', md: 'flex'} màn hình xs thì không hiển thị,
            màn hình md trở lên thì hiển thị theo kiểu flex
            */}
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant='outlined' startIcon={<AddIcon />}>Create</Button>
          </Box>
        </Box>

        <Box sx={{ display:'flex', alignItems: 'center', gap: 2}}> 
          <TextField type='search' label='Search' id='outline-search' size='small' sx={{ minWidth: 120}} />
          <ModeSelect />

          <Tooltip title='Notifications'>
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer'}}>
              <NotificationsNoneIcon sx={{ color: '#505258'}} />
            </Badge>
          </Tooltip>

          <Tooltip title='Help'>
            <Badge color="secondary" sx={{ cursor: 'pointer'}}>
              <HelpOutlineIcon sx={{ color: '#505258'}}  />
            </Badge>
          </Tooltip>

          <Profiles />
        </Box>

      
      </Box>
    )
  }
}

export default AppBar