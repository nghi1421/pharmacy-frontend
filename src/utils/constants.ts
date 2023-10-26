import { Item } from "../types/props/FormInputListProps";

export const APP_TITLE = 'Quản lí nhà thuốc';
export const APP_DESCRIPTION = 'Web được phát triển phục vụ việc quản lí nhà thuốc Việt Nam.';

export const API_LOGIN = 'login';

export const API_USER = 'users';
export const API_STAFF = 'staffs';
export const API_CUSTOMER = 'customers';
export const API_PROVIDER = 'providers';
export const API_POSITION = 'positions';
export const API_DRUG_CATEGORY = 'drug-categories';
export const API_IMPORT = 'imports';
export const API_EXPORT = 'exports';
export const API_TYPE_BY_USE = 'type-by-uses';

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