import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from '../Provider/AuthProvider/AuthProvider'
import { router } from './Routers/Routers'
import './index.css'

const queryClient =new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <QueryClientProvider client={queryClient} >
    <div className='mx-w-screen-xl mx-auto'>
        <RouterProvider router={router}/>
      </div>
    </QueryClientProvider>
    </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
