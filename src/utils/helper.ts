import { enqueueSnackbar } from "notistack"
import { QueryClient } from "react-query";

export const defaultOnSuccessHandle = (
    queryClient: QueryClient,
    navigate: any,
    response: any,
    queryKey: string,
    nextLink: string,
) => {
    if (response.data.message) {
        queryClient.invalidateQueries(queryKey, { refetchInactive: true })
        navigate(nextLink)
        enqueueSnackbar(response.data.message, {
            autoHideDuration: 3000,
            variant: 'success'
        })  
    }
    else {
        enqueueSnackbar(response.data.errorMessage, {
            autoHideDuration: 3000,
            variant: 'error'
        }) 
    }
}

export const defaultOnErrorHandle = (
    error: any,
) => {
    if (error.response.status === 400) {
        enqueueSnackbar('Vui lòng kiểm tra dữ liệu.', {
            autoHideDuration: 3000,
            variant: 'warning'
            }
        ) 
    }
    else {
        enqueueSnackbar('Lỗi server.', {
            autoHideDuration: 3000,
            variant: 'error'
            }
        )  
    }
}