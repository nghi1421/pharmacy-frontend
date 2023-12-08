
export interface Query{
    page: number
    perPage: number
    orderBy: string
    orderDirection: 'asc' | 'desc'
    searchColumns: string[]
    searchTerm: string
    filterColumn: string
    filterValue: string
}