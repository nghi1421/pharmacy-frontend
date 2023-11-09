import React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import AppRoutes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { theme } from './themes'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={3000}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
        </SnackbarProvider>
        
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
