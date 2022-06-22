import React from 'react'
import ReactDOM from 'react-dom/client'
import {createTheme} from '@mui/material'
import {SnackbarProvider} from 'notistack'
import {ThemeProvider} from '@mui/material/styles'
import App from './App'

export const customMui = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={customMui}>
      <SnackbarProvider maxSnack={3}>
        <App/>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
)
