import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value // lấy giá trị được chọn từ select
    console.log('selectedMode: ', selectedMode) 
    setMode(selectedMode) // cài lại giá trị mode cho hệ thống
    // setAge(event.target.value);
  };

  return (
    <FormControl  size="small" sx={{ minWidth: 120}}> {/* // sx={{ m: 1, minWidth: 120 }} */}
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
            <LightModeIcon fontSize='small'/> Light
          </div> */}
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small'/> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon/> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon/> System  
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;