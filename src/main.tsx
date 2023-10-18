import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux';
import { ContextProvider } from './contexts/index.ts';
import { store } from './redux/store/store.ts';
import Meta from './components/Meta.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <Meta />
    <Provider store={store}>
      <ContextProvider>
        {/* <RouterProvider router={router} /> */}
          {/* <App /> */}
          <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
)
