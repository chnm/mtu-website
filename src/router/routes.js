// define routes 

import About from 'pages/About';
import Home from 'pages/Home';
import Data from 'pages/Data';
import Maps from 'pages/Maps';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/data',
        component: Data
    },
    {
        path: '/maps',
        component: Maps
    }
]

export default routes