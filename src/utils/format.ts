import dayjs from "dayjs"

export const formatDateTime = (datetime: string) => {
    return dayjs(datetime).format('DD/MM/YYYY HH:mm:ss')
}

export const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY')
}

export const formatNumber = (number: number) => number.toLocaleString()

export const formatCurrency = (money: number) => 
    `${money.toLocaleString()}đ`;
