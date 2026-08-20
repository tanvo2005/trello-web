import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline' // mục đích đồng bộ css giữa các trình duyệt
import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
// cấu hình react-toastify để hiển thị thông báo toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}> {/** nhận vào 1 prop theme từ file theme.js */}
    <CssBaseline />
    <App />
    <ToastContainer position="bottom-left" theme="colored" autoClose={2000} />
  </CssVarsProvider>
  // </React.StrictMode>,
)
