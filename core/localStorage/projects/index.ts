import { IProject } from "@/core/types"

const getProjects = (): IProject[] | [] => {
    const projects = typeof window !== "undefined" && window.localStorage.getItem('projects')
    if (!projects) return []
    return JSON.parse(projects)
}
const getProject = (): IProject | null => {
    const project = typeof window !== "undefined" && window.localStorage.getItem('project')
    if (!project) return null
    return JSON.parse(project)
}
const updateProjects = (projectsData: IProject[]): any => {
    return typeof window !== "undefined" && window.localStorage.setItem('projects', JSON.stringify(projectsData))
}
const updateProject = (projectData: IProject): any => {
    return typeof window !== "undefined" && window.localStorage.setItem('project', JSON.stringify(projectData))
}
const deleteProjects = (): any => {
    return typeof window !== "undefined" && window.localStorage.removeItem('projects')
}
const deleteProject = (): any => {
    return typeof window !== "undefined" && window.localStorage.removeItem('project')
}

export default {getProjects, getProject, updateProjects, updateProject, deleteProjects, deleteProject}