import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value // lấy giá trị được chọn từ select
    console.log('selectedMode: ', selectedMode) 
    setMode(selectedMode) // cài lại giá trị mode cho hệ thống
    // setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  // khi dùng useColorScheme đã làm sắn bước lưu và lấy dữ liệu từ localStorage nên sẽ
  // không cần bước lưu hay lấy dữu liệu dark hay light mode từ localStorage nữa
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
        // localStorage.setItem('trello-dark-mode') lưu dữ liệu vào LocalStorage
        // localStorage.getItem('trello-dark-mode') lấy dữ liệu từ Localsorage
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {
  // useMediaQuery sẽ lẩy ra dark hay linght của hệ thống, prefersDarkMode trả về true hoặc false
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  // console.log('prefersDarkMode: ', prefersDarkMode)
  // console.log('prefersLightMode: ', prefersLightMode)

  return (
    <>
      <hr />
      <ModeToggle />
      <hr/>
      <ModeSelect />
      <hr/>
      <br />
      <div>Vo Xuan Tan</div>
      <Typography variant="body2" color="text.secondary">test Typography</Typography>
      <Button variant='text'>Text</Button>
      <Button variant="contained" color='success'>Hello world</Button>
      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />
      <br />
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
