import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import './index.css'
import routes from './routes/Routes';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster></Toaster>
      </AuthProvider>
    </HelmetProvider>

    {/* <RouterProvider router={routes} /> */}
    {/* <App /> */}
  </StrictMode>,
)
