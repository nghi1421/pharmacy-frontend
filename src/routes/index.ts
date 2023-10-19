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
import { AttachMoney, ClearAll, Group, Handshake, ManageAccounts, Medication, VerticalAlignBottom, VolunteerActivism } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';

export const dashboardRoutes: Array<Route> = [
    {      
        key: 'user-route',
        title: 'Tài khoản',
        path: '/users',
        icon: ManageAccounts,
        element: UserPage
    },
    {      
        key: 'staff-route',
        title: 'Nhân viên',
        path: '/staffs',
        icon: Group,
        element: StaffPage
    },
    {      
        key: 'customer-route',
        title: 'Khách hàng',
        path: '/customers',
        icon: PeopleIcon,
        element: CustomerPage
    },
    {      
        key: 'provider-route',
        title: 'Nhà cung cấp',
        path: '/providers',
        icon: Handshake,
        element: ProviderPage
    },
    {      
        key: 'position-route',
        title: 'Chức vụ',
        path: '/positions',
        icon: ClearAll,
        element: PositionPage
    },
    {      
        key: 'drug-category-route',
        title: 'Danh mục thuốc',
        path: '/drug-categories',
        icon: Medication,
        element: DrugCategoryPage
    },
    {      
        key: 'type-by-use-route',
        title: 'Phân loại công dụng',
        path: '/type-by-uses',
        icon: VolunteerActivism,
        element: TypeByUsePage
    },
    {      
        key: 'import-route',
        title: 'Nhập hàng',
        path: '/imports',
        icon: VerticalAlignBottom,
        element: ImportPage
    },
    {      
        key: 'export-route',
        title: 'Xuất hàng',
        path: '/exports',
        icon: AttachMoney,
        element: ExportPage
    }
]