import React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { theme } from './themes'
import AppRoutes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
