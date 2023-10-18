import React from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Route as IRoute } from "../types/Route";
import { dashboardRoutes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from '../pages/Login'
import ErrorPage from "../error-page";

const ModifiedMainLayout = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
};
const ModifiedAuthLayout = () => {
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    )
};


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={ <ErrorPage />}
            />
            <Route element={<ModifiedMainLayout />}>
                {dashboardRoutes.map((route: IRoute) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.element />}
                        errorElement={ <ErrorPage/>}
                    />
                ))}
            </Route>
            <Route element={<ModifiedAuthLayout />}>
                <Route key='login-route'
                    path='/login'
                    element={<Login />}
                    errorElement={ <ErrorPage/>}
                />
            </Route>
        </Routes>
    )
}

export default AppRoutes;