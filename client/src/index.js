import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './UserContext';
import './index.css';
import routes from './routes';

const router = createBrowserRouter(routes,{
     future: {
         v7_startTransition: true,
         v7_relativeSplatPath: true
     }
 })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<UserProvider>
     <RouterProvider router={router}/>
</UserProvider>
)


