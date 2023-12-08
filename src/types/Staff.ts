import { Position } from "./Position"

export type Staff = {
    id: number,
    name: string
    phoneNumber: string
    email: string
    dob: string
    gender: number
    isWorking: boolean
    position: Position
    address: string
    rawAddress: string
}