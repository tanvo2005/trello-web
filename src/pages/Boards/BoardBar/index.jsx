import React, { Component } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}
export class BoardBar extends Component {
  render() {
    return (
      <Box px={2} sx={{
        // backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto',
        borderBottom: '1px solid #00bfa5',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')

      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label="TanVoPY"
            clickable
          />

          <Chip 
            sx={{ color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              paddingX: '5px',
              borderRadius: '4px',
              '& .MuiSvgIcon-root': {
                color: 'white'
              },
              '&:hover': {
                backgroundColor: 'primary.50'
              }
            }}
            icon={<VpnLockIcon />}
            label="Public/Private Workspace"
            clickable
          />

          <Chip 
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to google drive"
            clickable
          />

           <Chip 
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />

          <Chip 
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />

        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Button 
            variant='outlined' 
            startIcon={<PersonAddIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover' : { borderColor: 'white'}
            }}
          >
            Invite
          </Button>

          <AvatarGroup
            max={4}
            total={24}
            sx={{ 
              '& .MuiAvatar-root': { width: 34, height: 34, fontSize: '0.875rem', border: 'none' },
              gap: '10px', // tách các avatar ra xa nhau hơn
            }}
          >
            <Tooltip title=" TanvoPY">
              <Avatar
                alt="TanvoPY"
                src='/avata.jpg' 
              /> 
            </Tooltip>

            <Tooltip title=" TanvoPY">
              <Avatar
                alt="TanvoPY"
                src='/avata.jpg' 
              /> 
            </Tooltip>
            <Tooltip title=" TanvoPY">
              <Avatar
                alt="TanvoPY"
                src='/avata.jpg' 
              /> 
            </Tooltip>
            <Tooltip title=" TanvoPY">
              <Avatar
                alt="TanvoPY"
                src='/avata.jpg' 
              /> 
            </Tooltip>
            <Tooltip title=" TanvoPY">
              <Avatar
                alt="TanvoPY"
                src='/avata.jpg' 
              /> 
            </Tooltip>
            {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
          </AvatarGroup>
        </Box>

      </Box>
    )
  }
}
export default BoardBar