export interface Data{
    message?: string;
    errorMessage?: string;
    data: any[];
}

export interface Meta {
    page: number
    perPage: number
    total: number
    totalPage: number
}

export interface DataResponse {
    data: Data;
    meta: Meta
}