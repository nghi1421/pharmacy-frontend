import { keyframes } from "@emotion/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

interface DateRangeItem {
    id: number
    label: string
    value: string[]
    checked: boolean
}

interface DateRange {
    startDate: string
    endDate: string
}

const useDateRange = (setValue: any, clearErrors: any) => {
    const [dateRanges, setDateRanges] = useState<DateRangeItem[]>([
        {
            id: 1,
            label: 'Hôm nay',
            value: [
                dayjs().startOf('day').format('DD-MM-YYYY'),
                dayjs().endOf('day').format('DD-MM-YYYY')
            ],
            checked: true
        },
        {
            id: 2,
            label: 'Hôm qua',
            value: [
                dayjs().subtract(1,'day').format('DD-MM-YYYY'),
                dayjs().subtract(1, 'day').format('DD-MM-YYYY')
            ],
            checked: false
        },
        {
            id: 3,
            label: '7 ngày trước',
            value: [
                dayjs().subtract(7,'day').format('DD-MM-YYYY'),
                dayjs().format('DD-MM-YYYY')
            ],
            checked: false
        },
        {
            id: 4,
            label: '30 ngày trước',
            value: [
                dayjs().subtract(30,'day').format('DD-MM-YYYY'),
                dayjs().format('DD-MM-YYYY')
            ],
            checked: false
        },
        {
            id: 5,
            label: 'Tháng trước',
            value:
                [
                    dayjs().subtract(1, 'month').startOf('month').format('DD-MM-YYYY'),
                    dayjs().subtract(1, 'month').endOf('month').format('DD-MM-YYYY')
                ],
            checked: false
        },
        {
            id: 6,
            label: '3 tháng trước',
            value: [
                dayjs().subtract(2, 'month').startOf('month').format('DD-MM-YYYY'),
                dayjs().format('DD-MM-YYYY')
            ],
            checked: false
        }
    ])
    const [searchParams, setSearchParams] = useSearchParams();

    const updateStatisticsQuery = (startDate: Date, endDate: Date) => {
        let searchQuery = new URLSearchParams();
        searchQuery.set('startDate', dayjs(startDate).format('DD-MM-YYYY'))
        searchQuery.set('endDate', dayjs(endDate).format('DD-MM-YYYY'))
        setSearchParams(searchQuery)
    }

    const chooseDateRange = (dateRange: DateRangeItem) => {
        const startDate = new Date(dayjs(dateRange.value[0], 'DD-MM-YYYY 00:00:00').toString())
        const endDate = new Date(dayjs(dateRange.value[1], 'DD-MM-YYYY 23:59:59').toString())
        setDateRanges(dateRanges.map((drange) => {
            return drange.id === dateRange.id
                ? { ...drange, checked: true }
                : { ...drange, checked: false }
        }))
        setValue('startDate', startDate, { shouldValidate: true })
        setValue('endDate', endDate, { shouldValidate: true })
    }

    const updateDateRange = (startDate: string, endDate: string) => {
        setDateRanges(dateRanges.map((dateRange) => {
            if (dateRange.value[0] === startDate && dateRange.value[1] === endDate) {
                return {...dateRange, checked: true}
            }
            else {
                return {...dateRange, checked: false}
            }
        }))
    }

    useEffect(() => {
        const startDate: string | null = searchParams.get('startDate');
        const endDate: string | null = searchParams.get('endDate');
        if (startDate && endDate) {
            updateDateRange(startDate, endDate)
        }
    }, [])

    const getCurrentDateRange = (): DateRange => {
        return {
            startDate: searchParams.get('startDate')
                ? dayjs(searchParams.get('startDate') as string, 'DD-MM-YYYY').format('DD/MM/YYYY')
                : dayjs().format('DD/MM/YYYY'),
            endDate: searchParams.get('endDate')
                ? dayjs(searchParams.get('endDate') as string, 'DD-MM-YYYY').format('DD/MM/YYYY')
                : dayjs().format('DD/MM/YYYY'),
        }
    }

    return {
        dateRanges,
        chooseDateRange,
        updateStatisticsQuery,
        updateDateRange,
        getCurrentDateRange
    }
}

export default useDateRange