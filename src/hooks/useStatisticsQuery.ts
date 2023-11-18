import { useSearchParams } from "react-router-dom";
import { StatisticsQuery } from "./useStatistics"
import { useState } from "react";

const useStatisticsQuery = (defaultQuery: StatisticsQuery) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [query, setQuery] = useState<StatisticsQuery>({
        startDate: searchParams.get('startDate') ? searchParams.get('startDate') as string : defaultQuery.startDate,
        endDate: searchParams.get('endDate') ? searchParams.get('endDate') as string : defaultQuery.endDate,
    })

    const execute = (query: StatisticsQuery) => {
        let searchQuery = new URLSearchParams();
        searchQuery.set('page', query.startDate.toString())
        searchQuery.set('perPage', query.endDate.toString())
        setSearchParams(searchQuery)
        setQuery(query)
    }
    return {
        query,
        execute,
        setQuery
    } 
}

export default useStatisticsQuery