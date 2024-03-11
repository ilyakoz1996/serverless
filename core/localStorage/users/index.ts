import { IUser } from "@/core/types"

const getUser = (): IUser | null => {
    const user = typeof window !== "undefined" && window.localStorage.getItem('user')
    if (!user) return null
    return JSON.parse(user)
}
const updateUser = (userData: IUser): any => {
    const user = typeof window !== "undefined" && window.localStorage.setItem('user', JSON.stringify(userData))
    return user
}
const deleteUser = (): any => {
    return typeof window !== "undefined" && window.localStorage.removeItem('user')
}

export default {getUser, updateUser, deleteUser}