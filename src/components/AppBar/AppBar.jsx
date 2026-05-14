import React, { Component, useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloLogo } from '~/assets/trello.svg'
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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar () {
  const [searchValue, setSearchValue] = useState('')
  
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
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track': { m: 2}
      }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={trelloLogo} inheritViewBox fontSize='small' sx={{ color: 'white' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography> {/* mặc định của Typography là xuống dòng, nếu muốn nó nằm ngang hàng thì dùng variant='span' */}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {/* lúc này display nhận vào 1 json object
            display: { xs: 'none', md: 'flex'} màn hình xs thì không hiển thị,
            màn hình md trở lên thì hiển thị theo kiểu flex
            */}
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button 
              variant='outlined' 
              startIcon={<AddIcon />} 
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': {
                  border:'none'
                }
              }} 
            >
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField 
            type='text' 
            label='Search' 
            id='outline-search' 
            size='small' 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white'}} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon 
                  sx={{ color: searchValue ? 'white' : 'transparent', fontSize: 'small', cursor: 'pointer'}} 
                  onClick={() => setSearchValue('')}
                />
              )
            }}

            sx={{ 
              minWidth: '120px',
              maxWidth: '170px',
              '& label': { color: 'white'},
              '& input': { color: 'white'}, // css cho phần text nhập vào của TextField có màu trắng
              '& label.Mui-focused': { color: 'white'}, // khi focus vào TextField thì label vẫn có màu trắng, không bị đổi màu theo mặc định của Material UI
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white',},// màu viền mặc định của TextField
                '&:hover fieldset': { borderColor: 'white',},
                '&.Mui-focused fieldset': { borderColor: 'white', },

              }
            }} 
          />

          <ModeSelect />

          <Tooltip title='Notifications'>
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Tooltip title='Help'>
            <Badge color="secondary" sx={{ cursor: 'pointer' }}>
              <HelpOutlineIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Profiles />
        </Box>


      </Box>
    )
  }

export default AppBar