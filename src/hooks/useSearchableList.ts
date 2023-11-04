import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Column } from "../types/Column";
import { enqueueSnackbar } from "notistack";
import { getSearchColums } from "../utils/helper";
import { GET_ARRAY_OF_KEY, GET_SEARCHABLE_KEY } from "../utils/constants";

interface Prop {
    searchableList: string[]
}

export const useSearchableList = (c: Column[]): any[] => {
    const [columns, setColumns] = useState<Column[]>(c);
    
    const { watch, control, setValue } = useForm<Prop>({
        defaultValues: { searchableList: getSearchColums(c, GET_ARRAY_OF_KEY) }
    });
    
    const watchSearchList = watch('searchableList')

    useEffect(() => {
        console.log(watchSearchList);
        console.log(columns)
        if (watchSearchList.length > 0) {
            setColumns(columns.map((column) => {
                return column.searchable ? {
                    ...column,
                    enableSearch: watchSearchList.includes(column.key) ? true : false
                } : column
            }))
        }
        else {
            if (getSearchColums(columns, GET_SEARCHABLE_KEY).length !== 0) {
                enqueueSnackbar('Vui lòng chọn ít nhất một trường để tính năng tìm kiếm khả dụng.', {
                    autoHideDuration: 3000,
                    variant: 'warning'
                })
                setColumns(columns.map((column) => {
                    return column.searchable ? {
                        ...column,
                        enableSearch: watchSearchList.includes(column.key) ? true : false
                    } : column
                }))
            }
           
        }
    }, [watchSearchList])
    
    return [ columns, watchSearchList, control, setValue ]
}