import async from "../components/Async";
import { IRoute as Route } from "../types/Route";

const Dashboard = async(() => import('../pages/dashboard/DashBoard'));
const Login = async(() => import('../pages/Login'));

export const routes: Array<Route> = [
    {
        key: 'dashboard-route',
        title: 'Quản trị',
        path: '/',
        enabled: true,
        component: Dashboard
    }
]

export const authRoutes: Array<Route> = [
   {
        key: 'login-route',
        title: 'Đăng nhập',
        path: '/',
        enabled: true,
        component: Login
    },  
]