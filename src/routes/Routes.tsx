import React from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Route as IRoute } from "../types/Route";
import { dashboardRoutes, formRoutes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from '../pages/Login'
import ErrorPage from "../error-page";
import SalesLayout from "../layouts/SalesLayout";
import ExportPage from "../pages/export/ExportPage";
import CreateExport from "../pages/export/CreateExport";

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
const ModifiedSalesLayout = () => {
    return (
        <SalesLayout>
            <Outlet />
        </SalesLayout>
    )
};


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={ <ErrorPage />}
            />

            <Route path='admin' element={<ModifiedMainLayout />}>
                {dashboardRoutes.map((route: IRoute) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.element />}
                        errorElement={ <ErrorPage/>}
                    />
                ))}

                {formRoutes.map((route: IRoute) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.element />}
                        errorElement={ <ErrorPage/>}
                    />
                ))}
            </Route>

            <Route path='sales' element={<ModifiedSalesLayout />}>
                 <Route
                    key='sales-create-form'
                    path='create'
                    element={<CreateExport />}
                    errorElement={ <ErrorPage/>}
                />
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