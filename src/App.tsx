import React, { createContext, useState } from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import AppRoutes from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { theme } from './themes'
import { Socket } from "socket.io-client";

interface ClientToServerEvents {
  hello: () => void;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: any) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface AuthType {
  accessToken: string | null,
  roleId: number | null,
  username: string | null,
  setRoleId: (n: number | null) => void,
  setAccessToken: (s: string | null) => void
  setUsername: (s: string | null) => void
}

export const AuthContext = createContext<AuthType>({
  accessToken: '',
  username: '',
  setAccessToken: () => { },
  roleId: null,
  setRoleId: () => { },
  setUsername: () => { }
})

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [roleId, setRoleId] = useState<number | null>(null)

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ accessToken, setAccessToken, roleId, setRoleId, username, setUsername }}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider autoHideDuration={3000}>
            <CssBaseline />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </React.Fragment>
  )
}

export default App
