import { useEffect, useState } from "react"
import { useGetDataDrugCategories } from "./useDrugCategory"
import globalEvent from "../utils/emitter"
import { DrugCategoryHandled } from "../types/DrugCategory"

export const useSalesExport = () => {
    const { isLoading: drugCategoryLoading, data: drugCategories } = useGetDataDrugCategories()
    const [drugs, setDrugs] = useState<any[]>([])
    const [cloneDrugs, setCloneDrugs] = useState<any[]>([])
    const [selectedDrugs, setSelectedDrugs] = useState<any[]>([])
    const [search, setSearch] = useState<string>('')
    const [pay, setPay] = useState<number[]>([0, 0, 0])

    const handleSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value as string
        if (searchTerm.trim().length > 0) {
            setDrugs(cloneDrugs.filter(
                drug => (drug.name).toLowerCase().includes(searchTerm.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(cloneDrugs)
        }
        setSearch(event.target.value as string);
    }

    const checkDrugCategory = (drugCategory: any) => {
        const data = cloneDrugs.map(drug => {
            return drug.id === drugCategory.id ? { ...drug, checked: true } : drug
        })
        setCloneDrugs(data)
        if (search.trim().length > 0) {
            setDrugs(data.filter(
                drug => (drug.name).toLowerCase().includes(search.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(data)
        }
        selectedDrugs.push({ ...drugCategory, checked: false, exportQuantity: 1, error: '' })
    }

    const unCheckDrugCategory = (drugCategory: any) => {
        const data = cloneDrugs.map(drug => {
            return drug.id === drugCategory.id ? { ...drug, checked: false } : drug
        })
        setCloneDrugs(data);
        if (search.trim().length > 0) {
            setDrugs(data.filter(
                drug => (drug.name).toLowerCase().includes(search.toLowerCase()) && !drug.checked
            ))
        }
        else {
            setDrugs(data)
        }

        const newSelectedDrugs = selectedDrugs.filter((drug) => drug.id !== drugCategory.id);
        setSelectedDrugs(newSelectedDrugs);
    }

    const updateQuantity = (drugCategory: any) => {
        let validateError = ''
        if (drugCategory.exportQuantity > drugCategory.rawQuantity) {
            validateError = 'Số lượng tồn không đủ để xuất bán.'
        }
        else {
            console.log(drugCategory.exportQuantity)
            if (isNaN(drugCategory.exportQuantity)) {
                validateError = 'Số lượng bán bắt buộc'
            }
            else if (drugCategory.exportQuantity <= 0) {
                validateError = 'Số lượng bán lớn hơn 0'
            }
            else {
                validateError = ''
            }
        }
        setSelectedDrugs(selectedDrugs.map(drug => {
            return drug.id === drugCategory.id ? { ...drugCategory, error: validateError } : drug
        }))
    }

    useEffect(() => {
        if (selectedDrugs.length > 0) {
            const withoutVat = selectedDrugs.reduce((value, drug) => {
                return value + drug.exportQuantity * drug.price
            }, 0)

            const vat = selectedDrugs.reduce((value, drug) => {
                return value + drug.rawVat * drug.exportQuantity * drug.price
            }, 0)

            const total = vat + withoutVat;

            setPay([withoutVat, vat, total])
        }
        else {
            setPay([0, 0, 0])
        }
    }, [selectedDrugs])

    useEffect(() => {
        if (drugCategories && drugCategories.length > 0) {
            const data = drugCategories.map((drug: DrugCategoryHandled) => {
                return { ...drug, checked: false, rawQuantity: drug.rawQuantity }
            });
            setDrugs(data)
            setCloneDrugs(data)
        }
    }, [drugCategories])

    useEffect(() => {
        globalEvent.emit('close-sidebar')
    }, [])



    return {
        drugCategoryLoading,
        handleSearchData,
        checkDrugCategory,
        unCheckDrugCategory,
        updateQuantity,
        setSelectedDrugs,
        setDrugs,
        setSearch,
        drugs,
        selectedDrugs,
        pay,
        search,
        cloneDrugs
    }
}