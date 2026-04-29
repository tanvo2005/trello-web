import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline' // mục đích đồng bộ css giữa các trình duyệt
import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}> // nhận vào 1 prop theme từ file theme.js
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
)
