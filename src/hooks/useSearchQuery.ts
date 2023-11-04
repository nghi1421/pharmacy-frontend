import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Query } from "../types/Query";
import { QuerySort } from "../components/table/TableComponent";

export const useSearchQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState<Query>({
        page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
        perPage: 5,
        orderBy: searchParams.get('orderBy') ? searchParams.get('orderBy') as string : 'id',
        orderDirection: searchParams.get('orderDirection') ? searchParams.get('orderDirection') as 'asc' | 'desc' : 'asc',
    })

    const actionChangePage = (page: number) => {
        setQuery({ ...query, page });
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', query.orderBy)
        searchQuery.set('orderDirection', query.orderDirection)
        setSearchParams(searchQuery)
    }

    const actionSort = (querySort: QuerySort) => {
        setQuery({...query, ...querySort })
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', query.page.toString())
        searchQuery.set('perPage', query.perPage.toString())
        searchQuery.set('orderBy', querySort.orderBy)
        searchQuery.set('orderDirection', querySort.orderDirection)
        setSearchParams(searchQuery)
    }

    return {
        query,
        actionChangePage,
        actionSort
    }
}