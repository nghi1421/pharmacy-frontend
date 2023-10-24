import React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { theme } from './themes'
import AppRoutes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"
// import { Notification } from './components/Notification'
import { SnackbarProvider } from "notistack"

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={3000}>
        {/* <Notification /> */}
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
