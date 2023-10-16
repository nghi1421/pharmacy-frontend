import { User } from '../types/User'

export interface IAuth {
    message: string
    data: User
    accessToken: string
    refreshToken: string
}