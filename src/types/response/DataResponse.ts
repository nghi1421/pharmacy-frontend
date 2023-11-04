export interface DataResponse{
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

export interface DataMetaResponse {
    data: any[];
    meta: Meta
}