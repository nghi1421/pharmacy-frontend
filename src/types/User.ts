import { Role } from "./Role";

export type User = {
    id: number
    username: string
    role: Role
    createdAt: string
    updatedAt: string
}