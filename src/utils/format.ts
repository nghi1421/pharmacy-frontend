import moment from "moment"

export const fortmatDateTime = (datetime: string) => {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss')
}

export const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY')
}