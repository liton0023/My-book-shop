import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import AllBooks from '../Pages/AllBooks/AllBooks';
import AddBook from '../Pages/DashBoard/AddBook/AddBook';
import AllUsers from '../Pages/DashBoard/AllUsers/AllUsers';
import DashBoard from '../Pages/DashBoard/DashBoard';
import Home from '../Pages/Home/Home';
import LogIn from '../Pages/LogIn/LogIn';
import SingUp from '../Pages/SingUp/SingUp';
import PrivetRoutes from './PrivetRoutes';

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
            path:'/books',
            element:<AllBooks></AllBooks>
        }
        ],
    },
    {
        path:'/dashboard',
        element:(
            <PrivetRoutes>
                <DashBoard></DashBoard>
            </PrivetRoutes>
        ),
       children:[
        {
            path:'addbook',
            element:<AddBook></AddBook>
        },
        {
            path:'allusers',
            element:<AllUsers></AllUsers>
        }
       ]
    },
])