import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/index.css'
import { ContextProvider } from './contexts/index.ts';
import Meta from './components/Meta.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <Meta />
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
          <App />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
