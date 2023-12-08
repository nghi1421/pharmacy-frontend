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
import { AttachMoney, ClearAll, Group, Handshake, Inventory, ManageAccounts, Medication, VerticalAlignBottom, VolunteerActivism } from "@mui/icons-material";
import ErrorIcon from '@mui/icons-material/Error';
import PeopleIcon from '@mui/icons-material/People';
import CreateStaff from "../pages/staff/CreateStaff";
import CreateCustomer from "../pages/customer/CreateCustomer";
import CreateProvider from "../pages/provider/CreateProvider";
import CreatePosition from "../pages/position/CreatePosition";
import CreateType from "../pages/type-by-use/CreateType";
import CreateDrugCategory from "../pages/drug-category/CreateDrugCategory";
import EditType from "../pages/type-by-use/EditType";
import EditPosition from "../pages/position/EditPosition";
import EditDrugCategory from "../pages/drug-category/EditDrugCategory";
import EditProvider from "../pages/provider/EditProvider";
import EditCustomer from "../pages/customer/EditCustomer";
import EditStaff from "../pages/staff/EditStaff";
import CreateImport from "../pages/import/CreateImport";
import DetailExportPage from "../pages/export/DetailPage";
import DetailImportPage from "../pages/import/DetailPage";
import SalesExport from "../pages/export/SalesExport";
import BarChartIcon from '@mui/icons-material/BarChart';
import StatisticsPage from "../pages/statistics/StatisticsPage";
import CancelExport from "../pages/export/CancelExport";
import InventoryPage from "../pages/inventory/InventoryPage";
import TroublePage from "../pages/trouble/TroublePage";
import { ProfilePage } from "../pages/ProfilePage";

export const dashboardRoutes: Array<Route> = [
    {      
        key: 'user-route',
        title: 'Tài khoản',
        path: 'users',
        icon: ManageAccounts,
        element: UserPage
    },
    {      
        key: 'staff-route',
        title: 'Nhân viên',
        path: 'staffs',
        icon: Group,
        element: StaffPage
    },
    {      
        key: 'customer-route',
        title: 'Khách hàng',
        path: 'customers',
        icon: PeopleIcon,
        element: CustomerPage
    },
    {      
        key: 'provider-route',
        title: 'Công ty dược',
        path: 'providers',
        icon: Handshake,
        element: ProviderPage
    },
    {      
        key: 'position-route',
        title: 'Chức vụ',
        path: 'positions',
        icon: ClearAll,
        element: PositionPage
    },
    {      
        key: 'drug-category-route',
        title: 'Danh mục thuốc',
        path: 'drug-categories',
        icon: Medication,
        element: DrugCategoryPage
    },
    {      
        key: 'type-by-use-route',
        title: 'Công dụng',
        path: 'type-by-uses',
        icon: VolunteerActivism,
        element: TypeByUsePage
    },
    {      
        key: 'import-route',
        title: 'Nhập hàng',
        path: 'imports',
        icon: VerticalAlignBottom,
        element: ImportPage
    },
    {      
        key: 'export-route',
        title: 'Xuất hàng',
        path: 'exports',
        icon: AttachMoney,
        element: ExportPage
    },
    {      
        key: 'inventory-route',
        title: 'Tồn kho',
        path: 'inventories',
        icon: Inventory,
        element: InventoryPage
    },
    {      
        key: 'statistics-route',
        title: 'Thống kê',
        path: 'statistics',
        icon: BarChartIcon,
        element: StatisticsPage
    },

    {      
        key: 'troubles-route',
        title: 'Sự cố',
        path: 'troubles',
        icon: ErrorIcon,
        element: TroublePage
    },
]

export const formRoutes: Array<Route> = [
    {      
        key: 'staff-create-form-route',
        title: 'Form nhân viên',
        path: 'staffs/create',
        icon: AttachMoney,
        element: CreateStaff
    },
    {      
        key: 'staff-edit-form-route',
        title: 'Form nhân viên',
        path: 'staffs/:staffId/edit',
        icon: AttachMoney,
        element: EditStaff
    },
    {      
        key: 'customer-create-form-route',
        title: 'Form khách hàng',
        path: 'customers/create',
        icon: AttachMoney,
        element: CreateCustomer
    },
    {      
        key: 'customer-edit-form-route',
        title: 'Form khách hàng',
        path: 'customers/:customerId/edit',
        icon: AttachMoney,
        element: EditCustomer
    },
    {      
        key: 'providers-create-form-route',
        title: 'Form khách hàng',
        path: 'providers/create',
        icon: AttachMoney,
        element: CreateProvider
    },
    {      
        key: 'providers-update-form-route',
        title: 'Form khách hàng',
        path: 'providers/:providerId/edit',
        icon: AttachMoney,
        element: EditProvider
    },
    {      
        key: 'positions-create-form-route',
        title: 'Form vị trí',
        path: 'positions/create',
        icon: AttachMoney,
        element: CreatePosition
    },
    {      
        key: 'positions-edit-form-route',
        title: 'Form công dụng',
        path: 'positions/:positionId/edit',
        icon: AttachMoney,
        element: EditPosition
    },
    {      
        key: 'type-by-uses-create-form-route',
        title: 'Form công dụng',
        path: 'type-by-uses/create',
        icon: AttachMoney,
        element: CreateType
    },
    {      
        key: 'type-by-uses-edit-form-route',
        title: 'Form công dụng',
        path: 'type-by-uses/:typeId/edit',
        icon: AttachMoney,
        element: EditType
    },
    {      
        key: 'drug-category-create-form-route',
        title: 'Form danh mục thuốc',
        path: 'drug-categories/create',
        icon: AttachMoney,
        element: CreateDrugCategory
    },
    {      
        key: 'drug-category-update-form-route',
        title: 'Form danh mục thuốc',
        path: 'drug-categories/:drugCategoryId/edit',
        icon: AttachMoney,
        element: EditDrugCategory
    },
    {      
        key: 'import-create-form-route',
        title: 'Form danh phieu nhap hang',
        path: 'imports/create',
        icon: AttachMoney,
        element: CreateImport
    },
    {      
        key: 'export-create-form-route',
        title: 'Form danh phieu nhap hang',
        path: 'sales-exports/create',
        icon: AttachMoney,
        element: SalesExport
    },
    {      
        key: 'create-cancel-export-form-route',
        title: 'Form danh phieu nhap hang',
        path: 'cancel-exports/create',
        icon: AttachMoney,
        element: CancelExport
    },
    {      
        key: 'import-detail-form-route',
        title: 'Form danh phieu xuat hang',
        path: 'imports/:importId/view',
        icon: AttachMoney,
        element: DetailImportPage
    },
    {      
        key: 'export-detail-form-route',
        title: 'Form danh phieu xuat hang',
        path: 'exports/:exportId/view',
        icon: AttachMoney,
        element: DetailExportPage
    },
]

