import moment from "moment"

export const formatDateTime = (datetime: string) => {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss')
}

export const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY')
}

export const formatCurrency = (money: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
