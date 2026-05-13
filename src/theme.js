import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { cyan, orange, red, teal, deepOrange } from '@mui/material/colors'
import { BorderColor } from '@mui/icons-material';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
// Create a theme instance.
const theme = extendTheme({
  // khai báo những thuộc tính tự đặt cho riêng app cảu mình, trelloCustom là tên tự đặt 
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     // primary: {
    //     //   main: '#ff5252'
    //     // },
    //     primary: teal,
    //     secondary: deepOrange
    //   },
    // },
    // dark: {
    //   palette: {
    //     // primary: {
    //     //   main: '#000'
    //     // },
    //     primary: cyan,
    //     secondary: orange
    //   },
    // },

  },
  // ...other properties
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body : { // css thanh scrollbar cho toàn bộ web
          '*::-webkit-scrollbar': {// có dấu * để áp dụng cho tất cả các phẩn tử của thẻ body
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          },
          
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
        },
      },
    },
    MuiInputLabel: { // MuiInputLabel quy định style cho label của TextField, ở đây là label 'Search'
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
        })
      },
    },
    MuiTypography: { // quy định style cỡ chữ cho tất cả các Typography
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiTypography-body1': { // chỉ áp dụng cho Typography có variant là body1
          fontSize: '0.875rem',
          }
        })
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => ({
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            // '.MuiOutlinedInput-notchedOutline': {  // thuộc tính tô màu cho viền của ô search
            //   // borderColor: theme.palette.primary.light, 
            // },
            // '&:hover': {
            //   '.MuiOutlinedInput-notchedOutline': {  
            //   // borderColor: theme.palette.primary.main,
            // }
            // },
            
            '& fieldset': { // Loại bỏ đường viền tô đậm mặc định của TextField
              borderWidth: '0.5px !important'
            },
            '&:hover fieldset': { // Loại bỏ đường viền tô đậm mặc định của TextField
              borderWidth: '1.5px !important'
            },
            '&.Mui-focused fieldset': { 
              borderWidth: '1.5px !important'
            },
        })
      },
    },
  },
});

export default theme