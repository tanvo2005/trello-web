import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, orange, red, teal, deepOrange } from '@mui/material/colors'
import { BorderColor } from '@mui/icons-material';

// Create a theme instance.
const theme = extendTheme({
  // khai báo những thuộc tính tự đặt cho riêng app cảu mình, trelloCustom là tên tự đặt 
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px',

  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: '#ff5252'
        // },
        primary: teal,
        secondary: deepOrange
      },
    },
    dark: {
      palette: {
        // primary: {
        //   main: '#000'
        // },
        primary: cyan,
        secondary: orange
      },
    },
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
            backgroundColor: '#bdc3c7',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894',
            
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: { // MuiInputLabel quy định style cho label của TextField, ở đây là label 'Search'
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        })
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {  // thuộc tính tô màu cho viền của ô search
              borderColor: theme.palette.primary.light, 
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {  
              borderColor: theme.palette.primary.main, 
            }
            },
            '& fieldset': { // Loại bỏ đường viền tô đậm mặc định của TextField
              borderWidth: '1px !important'
            }
          }
        }
      },
    },
  },
});

export default theme