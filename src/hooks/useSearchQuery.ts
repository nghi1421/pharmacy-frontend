import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Query } from "../types/Query";
import { QuerySort } from "../components/table/TableComponent";

export interface QuerySearch {
    searchTerm: string
    searchColumns: string[]
}

export interface QueryFilter {
    filterColumn: string
    filterValue: string
}

export const useSearchQuery = (defaultSearchQuery: string[]) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState<Query>({
        page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
        perPage: 5,
        orderBy: searchParams.get('orderBy') ? searchParams.get('orderBy') as string : 'id',
        orderDirection: searchParams.get('orderDirection') ? searchParams.get('orderDirection') as 'asc' | 'desc' : 'asc',
        searchColumns: searchParams.get('searchColumns') ? (searchParams.get('searchColumns') as string)
            .split(',')
            .map((value) => value.trim()).filter((value) => value)
            : defaultSearchQuery,
        searchTerm: searchParams.get('searchTerm') ? searchParams.get('searchTerm') as string : '',
        filterColumn: searchParams.get('filterColumn') ? searchParams.get('filterColumn') as string : '',
        filterValue: searchParams.get('filterValue') ? searchParams.get('filterValue') as string : '',
    })

    const actionChangePage = (page: number) => {
        setQuery({ ...query, page });
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', query.orderBy)
        searchQuery.set('orderDirection', query.orderDirection)
        
        if (query.searchTerm.length > 0) {
            searchQuery.set('searchTerm', query.searchTerm)
            searchQuery.set('searchColumns', query.searchColumns.toString())
        }
        setSearchParams(searchQuery)
    }

    const actionSort = (querySort: QuerySort) => {
        setQuery({...query, ...querySort })
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', query.page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', querySort.orderBy)
        searchQuery.set('orderDirection', querySort.orderDirection)
        searchQuery.set('searchTerm', query.searchTerm)
        searchQuery.set('searchColumns', query.searchColumns.toString())
        if (query.filterColumn) {
            searchQuery.set('filterColumn', query.filterColumn)
            searchQuery.set('filterValue', query.filterValue)
        }
        if (query.searchTerm.length > 0) {
            searchQuery.set('searchTerm', query.searchTerm)
            searchQuery.set('searchColumns', query.searchColumns.toString())
        }
        setSearchParams(searchQuery)
    }

    const actionSearch = (querySearch: QuerySearch) => {
        setQuery({...query, ...querySearch, page: 1 })
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', '1')
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', query.orderBy)
        searchQuery.set('orderDirection', query.orderDirection)
        if (query.filterColumn) {
            searchQuery.set('filterColumn', query.filterColumn)
            searchQuery.set('filterValue', query.filterValue)
        }
        searchQuery.set('searchTerm', querySearch.searchTerm)
        searchQuery.set('searchColumns', querySearch.searchColumns.toString())
        setSearchParams(searchQuery)
    }

    const actionFilter = (queryFilter: QueryFilter) => {
        setQuery({...query, ...queryFilter, page: 1 })
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', '1')
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', query.orderBy)
        searchQuery.set('orderDirection', query.orderDirection)
        searchQuery.set('searchTerm', query.searchTerm)
        searchQuery.set('searchColumns', query.searchColumns.toString())
        searchQuery.set('filterColumn', queryFilter.filterColumn)
        searchQuery.set('filterValue', queryFilter.filterValue)
        setSearchParams(searchQuery)
    }

    const updateQueryParams = (searchColumns: string[]) => {
        if (JSON.stringify(searchColumns) !== JSON.stringify(defaultSearchQuery && query.searchTerm.length > 0)) {
            setQuery({ ...query, searchColumns: searchColumns })
            let searchQuery = new URLSearchParams();
            searchQuery.set('page', query.page.toString())
            searchQuery.set('perPage', query.perPage.toString())
            searchQuery.set('orderBy', query.orderBy)
            searchQuery.set('orderDirection', query.orderDirection)
            if (query.filterColumn) {
                searchQuery.set('filterColumn', query.filterColumn)
                searchQuery.set('filterValue', query.filterValue)
            }

            if (query.searchTerm.length > 0) {
                searchQuery.set('searchTerm', query.searchTerm)
                searchQuery.set('searchColumns', searchColumns.toString())
            }
            setSearchParams(searchQuery)
        }
    }

    return {
        query,
        actionChangePage,
        actionSort,
        actionSearch,
        actionFilter,
        updateQueryParams
    }
}