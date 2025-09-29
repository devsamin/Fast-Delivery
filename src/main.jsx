import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router/router.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
// ..
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-exo-2'>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>

    </div>
  </StrictMode>
)
