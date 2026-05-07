import Board from "./pages/Boards/_id"


function App() {
  // useMediaQuery sẽ lẩy ra dark hay linght của hệ thống, prefersDarkMode trả về true hoặc false
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

  // console.log('prefersDarkMode: ', prefersDarkMode)
  // console.log('prefersLightMode: ', prefersLightMode)

  return (
    // disableGutters maxWidth={false} sẽ hiển thi full màn hình không bị trình trạng pading, margin hay chiều
    // rông tối đa nữa
    // <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main'}}>
      
    //   <Box sx={{
    //     backgroundColor: 'primary.light',
    //     width: '100%',
    //     // heignt: '48px',
    //     height: (theme) => theme.trello.appBarHeight, // sử dụng thuộc tính tự đặt trong theme,
    //     display: 'flex',
    //     alignItems: 'center'
    //   }}>
    //     <ModeSelect />
    //   </Box>

    //   <Box sx={{
    //     backgroundColor: 'primary.dark',
    //     width: '100%',
    //     height: (theme) => theme.trello.boardBarHeight, 
    //     display: 'flex',
    //     alignItems: 'center'
    //   }}>
    //       Borad bar
    //   </Box>

    //   <Box sx={{
    //     backgroundColor: 'primary.main',
    //     width: '100%',
    //     height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
    //     display: 'flex',
    //     alignItems: 'center'
    //   }}>
    //     board content
    //   </Box>
    // </Container>

    
    <>
      {/* React Router Dom */}
      <Board/>
    </>
  )
}

export default App
