import { IUser } from "@/core/types"
import axios from "axios"

const getUserById = async (id: string): Promise<IUser> => {
    const user = await axios.get(`/api/users?userId=${id}`)
    return user.data
}
const getUserByEmail = async (email: string): Promise<IUser> => {
    const user = await axios.get(`/api/users?email=${email}`)
    return user.data
}
const getUsers = async (): Promise<IUser[] | []> => {
    const users = await axios.get(`/api/users`)
    if (!users.data) return []
    return users.data
}
const createUser = async (userData: any): Promise<IUser> => {
    const user = await axios.post(`/api/users`, userData)
    return user.data
}
const updateUserById = async (userData: IUser): Promise<IUser> => {
    const user = await axios.put(`/api/users?userId=${userData.id}`, userData)
    return user.data
}
const updateUserByEmail = async (userData: IUser): Promise<IUser> => {
    const user = await axios.put(`/api/users?email=${userData.email}`, userData)
    return user.data
}
const deleteUser = async (id: string): Promise<IUser> => {
    const user = await axios.delete(`/api/users?userId=${id}`)
    return user.data
}

export default { getUsers, getUserById, getUserByEmail, createUser, updateUserById, updateUserByEmail, deleteUser }