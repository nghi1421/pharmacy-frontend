import { IRoute as Route } from "../types/Route";
import Login from '../pages/Login'
import Dashboard from '../pages/dashboard/DashBoard'

export const dashboardRoutes: Array<Route> = [
    {
        key: 'dashboard-route',
        title: 'Quản trị',
        path: '/',
        enabled: true,
        element: Dashboard
    }
]

export const authRoutes: Array<Route> = [
   {
        key: 'login-route',
        title: 'Đăng nhập',
        path: '/',
        enabled: true,
        element: Login
    },  
]