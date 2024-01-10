import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import DashBoard from '../Pages/DashBoard/DashBoard';
import Home from '../Pages/Home/Home';
import LogIn from '../Pages/LogIn/LogIn';
import SingUp from '../Pages/SingUp/SingUp';

export const router =createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:'/singup',
                element:<SingUp></SingUp>
            },
            {
                path:'/login',
                element:<LogIn></LogIn>
            },
            {
                path:'/dashboard',
                element:<DashBoard></DashBoard>
            }
        ]
    }
])