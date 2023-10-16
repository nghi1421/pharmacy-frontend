import React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { theme } from './themes'
import AppRoutes from "./routes/Routes"

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes/>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
