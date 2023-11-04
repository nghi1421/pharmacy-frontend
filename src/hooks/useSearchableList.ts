import { useForm } from "react-hook-form";

interface Prop {
    searchableList: string[]
}

export interface Item {
    label: string
    value: string
}

export const useSearchableList = () => {
    const { watch, control, setValue  } = useForm<Prop>({
        defaultValues: { searchableList: ['id'] }
    });
    
    const searchList = watch('searchableList')
    return [ control, searchList, setValue ]
}