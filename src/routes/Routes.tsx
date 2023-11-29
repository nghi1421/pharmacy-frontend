import React from "react";
import { Route, Routes } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Route as IRoute } from "../types/Route";
import { dashboardRoutes, formRoutes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from '../pages/Login'
import SalesLayout from "../layouts/SalesLayout";
import CreateExport from "../pages/export/SalesExport";
import { NotFound404 } from "../pages/NotFound404";
import { Forbidden403 } from "../pages/Forbidden403";

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
                element={ <NotFound404 />}
            />
            
            <Route
                key='403-page'
                path='403'
                element={<Forbidden403 />}
            />

            <Route path='admin' element={<ModifiedMainLayout />}>
                {dashboardRoutes.map((route: IRoute) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.element />}
                        errorElement={ <NotFound404/>}
                    />
                ))}

                {formRoutes.map((route: IRoute) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.element />}
                        errorElement={ <NotFound404/>}
                    />
                ))}
            </Route>

            <Route path='sales' element={<ModifiedSalesLayout />}>
                 <Route
                    key='sales-create-form'
                    path='create'
                    element={<CreateExport />}
                    errorElement={ <NotFound404/>}
                />
            </Route>

            <Route element={<ModifiedAuthLayout />}>
                <Route key='login-route'
                    path='/login'
                    element={<Login />}
                    errorElement={ <NotFound404/>}
                />
            </Route>
            
        </Routes>
    )
}

export default AppRoutes;