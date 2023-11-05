import { enqueueSnackbar } from "notistack"
import { UseFormSetError } from "react-hook-form";
import { QueryClient } from "react-query";
import { Query } from "../types/Query";
import { Column } from "../types/Column";
import { Item } from "../types/props/FormInputListProps";

export enum SearchColumnsOption {
    GET_ARRAY_OF_KEY = 1,
    GET_SEARCHABLE_LIST = 2,
    GET_SEARCHABLE_KEY = 3
}

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
    console.log(query)
    // queryParams.set('page', query.page.toString())
    // queryParams.set('perPage', query.perPage.toString())
    // queryParams.set('orderBy', query.orderBy)
    // queryParams.set('orderDirection', query.orderDirection)
    // if (query.searchTerm.length > 0) {
    //     queryParams.set('searchTerm', query.searchTerm)
    //     queryParams.set('searchColumns', query.searchColumns.toString())
    // }
    return queryParams;
}


export const getSearchColums = (columns: Column[], option: SearchColumnsOption = 1): any[] => {
    switch (option) {
        case SearchColumnsOption.GET_ARRAY_OF_KEY: {
            return columns.reduce((filtered, column: Column) => {
                    if (column && column.enableSearch) {
                        filtered.push(column.key);
                    }
                    return filtered;
                }, [] as string[]
            ) 
        }
        
        case SearchColumnsOption.GET_SEARCHABLE_LIST: {
            return columns.reduce((filtered, column: Column) => {
                    if (column && column.searchable) {
                        filtered.push({ value: column.key, label: column.value});
                    }
                    return filtered;
                }, [] as Item[]
            )
        }
        
        case SearchColumnsOption.GET_SEARCHABLE_KEY: {
            return columns.reduce((filtered, column: Column) => {
                    if (column && column.searchable && column.enableSearch) {
                        filtered.push(column.key);
                    }
                    return filtered;
                }, [] as string[]
            )
        }
        
        default: {
            return []
        }
    }
}

export const warningSearchField = () => {
    enqueueSnackbar('Vui lòng chọn cột tìm kiếm để thực hiện tìm kiếm.', {
        autoHideDuration: 3000,
        variant: 'warning'
    })  
}