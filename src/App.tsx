import React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { theme } from './themes'
import AppRoutes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
