export type Customer = {
    id: number,
    name: string
    phoneNumber: string
    email: string
    address: string
    gender: number
}

export type CustomerData = {
    id: number,
    name: string
    phoneNumber: string
    email: string
    address: string
    gender: any
    rawAddress?: string
}