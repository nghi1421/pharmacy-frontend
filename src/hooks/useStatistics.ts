import { useQuery } from "react-query"
import axiosClient from "../services/axios"
import { API_GET_STATISTICS_TODAY } from "../utils/constants"


const useGetStatisticsToday = () => {

  return useQuery({
    queryFn: () => axiosClient
      .get(API_GET_STATISTICS_TODAY)
      .then((response) => {
        if (response.data.message) {
          return response.data.data
        }
        return response
      })
  })
}

export {
    useGetStatisticsToday
}