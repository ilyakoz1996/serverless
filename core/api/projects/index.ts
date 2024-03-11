import { IProject, IWallet } from "@/core/types"
import axios from "axios"

const getProject = async (id: string): Promise<IProject> => {
    const project = await axios.get(`/api//projects?projectId=${id}`)
    return project.data
}
const getProjectsByUserId = async (userId: string): Promise<IProject[] | []> => {
    const projects = await axios.get(`/api/projects?userId=${userId}`)
    if (!projects.data) return []
    return projects.data
}
const getProjectsByUserEmail = async (userEmail: string): Promise<IProject[] | []> => {
    const projects = await axios.get(`/api/projects?email=${userEmail}`)
    if (!projects.data) return []
    return projects.data
}
const getProjectsBySlug = async (slug: string): Promise<IProject> => {
    const projects = await axios.get(`/api/projects?slug=${slug}`)
    return projects.data
}
const getProjects = async (): Promise<IProject[] | []> => {
    const projects = await axios.get(`/api/projects`)
    if (!projects.data) return []
    return projects.data
}
const createWallet = async (walletData: IWallet): Promise<IWallet> => {
    const wallet = await axios.post(`/api/wallets`, walletData)
    return wallet.data
}
const getWallet = async (projectId: string): Promise<IWallet> => {
    const wallet = await axios.get(`/api/wallets?projectId=${projectId}`)
    return wallet.data
}
const createProject = async (projectData: IProject): Promise<IProject> => {
    const project = await axios.post(`/api/projects`, projectData)
    return project.data
}
const updateProject = async (projectData: IProject): Promise<IProject> => {
    const project = await axios.put(`/api/projects?projectId=${projectData.id}`)
    return project.data
}
const deleteProject = async (id: string): Promise<IProject> => {
    const project = await axios.delete(`/api/projects?projectId${id}`)
    return project.data
}

export default { getProjects, getProject, getProjectsByUserId, createWallet, getProjectsByUserEmail,getWallet, getProjectsBySlug, createProject, updateProject, deleteProject }