import { enqueueSnackbar } from "notistack"
import { UseFormSetError } from "react-hook-form";
import { QueryClient } from "react-query";
import { Query } from "../types/Query";

export const defaultOnSuccessHandle = (
    queryClient: QueryClient,
    navigate: any,
    response: any,
    queryKey: string,
    nextLink: string,
) => {
    if (response.data.message) {
        queryClient.invalidateQueries(queryKey, { refetchInactive: true })
        if (navigate) {
            navigate(nextLink)
        }
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

export const defaultCatchErrorHandle = (
    error: any,
    setError?: UseFormSetError<any>
) => {
    if (error.response.data.validateError && setError) {
        error.response.data.validateError.forEach((validate: any) => {
            setError(validate.key, { type: 'custom', message: validate.value[0]})
        })
        enqueueSnackbar('Vui lòng kiểm tra dữ liệu.', {
            autoHideDuration: 3000,
            variant: 'warning'
        })
    }
    else {
        if (error.response.data.errorMessage) {
            enqueueSnackbar(error.response.data.errorMessage, {
                autoHideDuration: 3000,
                variant: 'error'
            }) 
        }
        else {
            enqueueSnackbar('Lỗi server.', {
                autoHideDuration: 3000,
                variant: 'error'
            })   
        }
         
    }
}

export const updateSearchParams = (query: Query): URLSearchParams => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', query.page.toString())
    queryParams.set('perPage', query.perPage.toString())
    queryParams.set('orderBy', query.orderBy)
    queryParams.set('orderDirection', query.orderDirection)

    return queryParams;
}