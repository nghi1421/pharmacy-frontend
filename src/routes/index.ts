import { Route } from "../types/Route";
import UserPage from "../pages/user/UserPage";
import StaffPage from "../pages/staff/StaffPage";
import CustomerPage from "../pages/customer/CustomerPage";
import PositionPage from "../pages/position/PositionPage";
import DrugCategoryPage from "../pages/drug-category/DrugCategoryPage";
import TypeByUsePage from "../pages/type-by-use/TypeByUsePage";
import ImportPage from "../pages/import/ImportPage";
import ExportPage from "../pages/export/ExportPage";
import ProviderPage from "../pages/provider/ProviderPage";

export const dashboardRoutes: Array<Route> = [
    {      
        key: 'user-route',
        title: 'Quản lí tài khoản',
        path: '/users',
        element: UserPage      
    },
    {      
        key: 'staff-route',
        title: 'Quản lí nhân viên',
        path: '/staffs',
        element: StaffPage      
    },
    {      
        key: 'customer-route',
        title: 'Quản lí khách hàng',
        path: '/customers',
        element: CustomerPage      
    },
    {      
        key: 'provider-route',
        title: 'Quản lí nhà cung cấp thuốc',
        path: '/providers',
        element: ProviderPage      
    },
    {      
        key: 'position-route',
        title: 'Quản lí chức vụ',
        path: '/positions',
        element: PositionPage      
    },
    {      
        key: 'drug-category-route',
        title: 'Quản lí danh mục thuốc',
        path: '/drug-categories',
        element: DrugCategoryPage      
    },
    {      
        key: 'type-by-use-route',
        title: 'Quản lí công dụng thuốc',
        path: '/type-by-uses',
        element: TypeByUsePage      
    },
    {      
        key: 'import-route',
        title: 'Quản lí danh nhập hàng',
        path: '/imports',
        element: ImportPage      
    },
    {      
        key: 'export-route',
        title: 'Quản lí danh xuất hàng',
        path: '/exports',
        element: ExportPage      
    }
]