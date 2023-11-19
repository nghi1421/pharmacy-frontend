import { useQuery } from "react-query"
import axiosClient from "../services/axios"
import { API_GET_STATISTICS, API_GET_STATISTICS_TODAY } from "../utils/constants"
import { useSearchParams } from "react-router-dom"
import dayjs from "dayjs"
import { enqueueSnackbar } from "notistack"

export interface StatisticsQuery {
    startDate: string
    endDate: string
}

const useGetStatisticsToday = () => {
  return useQuery({
    queryFn: () => 
        axiosClient
        .get(API_GET_STATISTICS_TODAY)
        .then((response) => {
            if (response.data.message) {
            return response.data.data
            }
            return response
        })
  })
}

const useGetStatistics = () => {
    const [searchParams, _] = useSearchParams();
    if (searchParams.toString().length === 0) {
        const query = `startDate=${dayjs().format('DD-MM-YYYY')}&endDate=${dayjs().format('DD-MM-YYYY')}`
        return useQuery({
            queryKey: [query],
            queryFn: () =>
                axiosClient
                    .get(`${API_GET_STATISTICS}?${query}`)
                    .then((response) => {
                        if (response.data.message) {
                            return response.data.data
                        }
                        enqueueSnackbar(response.data.errorMessage, {
                            variant: 'error',
                            autoHideDuration: 3000
                        })
                        return response
                    
                    }),
            enabled: !!query
        })
    }
    else {
        return useQuery({
            queryKey: [searchParams.toString()],
            queryFn: () => 
                axiosClient
                .get(`${API_GET_STATISTICS}?${searchParams.toString()}`)
                .then((response) => {
                    if (response.data.message) {
                        return response.data.data
                    }
                    return response
                
                }),
            enabled: !!searchParams.toString()
        })
    }
}

// const useStatistics = (query: StatisticsQuery) => {
//     const queryParams = updateStatisticsParams(query)
//     const res1 = useQuery({
//         queryFn: () => 
//             axiosClient
//             .get(API_GET_STATISTICS_TODAY)
//             .then((response) => {
//                 if (response.data.message) {
//                 return response.data.data
//                 }
//                 return response
//             })
//     })
    
//     const res2 = useQuery({
//         queryKey: [queryParams.toString()],
//         queryFn: () => 
//             axiosClient
//             .get(`${API_GET_STATISTICS}?${queryParams.toString()}`)
//             .then((response) => {
//                 console.log(response)
//                 if (response.data.data.message) {
//                     console.log(response.data.data.data)
//                     return response.data.data.data
//                 }
//                 return response
            
//             })
//             .catch(error =>
//                 console.log(error)
//             ),
//         enabled: !!queryParams.toString()
//     })
    
//     return [res1, res2]
// }
export {
    useGetStatisticsToday,
    useGetStatistics,
}