
export interface Query{
    page: number
    perPage: number
    orderBy: string
    orderDirection: 'asc' | 'desc'
}