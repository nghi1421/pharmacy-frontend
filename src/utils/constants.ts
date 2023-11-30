import { Item } from "../types/props/FormInputListProps";

export const APP_TITLE = 'Quản lí nhà thuốc';
export const APP_DESCRIPTION = 'Web được phát triển phục vụ việc quản lí nhà thuốc Việt Nam.';

export const API_LOGIN = 'login';
export const API_FRESH_TOKEN = 'refresh-token';

export const API_USER = 'users';
export const API_STAFF = 'staffs';
export const API_CUSTOMER = 'customers';
export const API_PROVIDER = 'providers';
export const API_POSITION = 'positions';
export const API_DRUG_CATEGORY = 'drug-categories';
export const API_IMPORT = 'imports';
export const API_EXPORT = 'exports';
export const API_EXPORT_TODAY = 'exports-today';
export const API_CANCEL_EXPORT = 'exports/cancel';
export const API_TYPE_BY_USE = 'type-by-uses';

export const API_USER_WITH_ID = 'users/:userId';
export const API_STAFF_WITH_ID = 'staffs/:staffId';
export const API_CUSTOMER_WITH_ID = 'customers/:customerId';
export const API_PROVIDER_WITH_ID = 'providers/:providerId';
export const API_POSITION_WITH_ID = 'positions/:positionId';
export const API_DRUG_CATEGORY_WITH_ID = 'drug-categories/:drugId';
export const API_IMPORT_WITH_ID = 'imports/:importId';
export const API_EXPORT_WITH_ID = 'exports/:exportId';
export const API_TYPE_BY_USE_WITH_ID = 'type-by-uses/:typeId';

export const API_GET_STATISTICS_TODAY = 'statistics-today';
export const API_GET_STATISTICS = 'statistics';

export const API_STAFF_UPDATE_STATUS = 'staffs/:staffId/update-status'

export const genders: Item[] = [
    {
        value: '0',
        label: 'Nữ'
    },
    {
        value: '1',
        label: 'Nam'
    },
    {
        value: '2',
        label: 'Khác'
    }
]

export const GET_ARRAY_OF_KEY = 1
export const GET_SEARCHABLE_LIST = 2
export const GET_SEARCHABLE_KEY = 3