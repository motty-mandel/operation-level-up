import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import SignUp from './pages/signUp';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/welcome',
                element: <Welcome />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);