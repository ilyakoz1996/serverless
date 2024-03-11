import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../api"
import { IProject } from "../types"
import LStorage from "../localStorage"

const api = new API()
const storage = new LStorage()

export const useGetProjects = () => {
   return useQuery({ queryKey: ['projects'], queryFn: () => api.projects.getProjects() })
}
export const useGetProjectsByUserId = (userId: string | undefined) => {
   return useQuery({ queryKey: ['projects'], queryFn: () => api.projects.getProjectsByUserId(userId!), enabled: !!userId
  })
}

// export const useGetProjectsByUserEmail = (userEmail: string) => {
//    return useQuery({ queryKey: ['projects'], queryFn: () => api.projects.getProjectsByUserEmail(userEmail),
//   })
// }

export const useGetProjectsByUserEmail = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (userEmail: string) => api.projects.getProjectsByUserEmail(userEmail),
    onSuccess: (newProjectsData: IProject[]) => {
      storage.projects.updateProjects(newProjectsData)
      const currentProject = storage.projects.getProject()
      if (newProjectsData.length > 0 && !currentProject) {
        storage.projects.updateProject(newProjectsData[0])
      }
      queryClient.invalidateQueries({queryKey: ['projects']});
    }
  })
};

export const useGetProject = (projectId: string | undefined) => {
   return useQuery({ queryKey: ['projects'], queryFn: () => api.projects.getProject(projectId!), enabled: !!projectId })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  console.log('queryClient', queryClient)
  return useMutation({ mutationFn: (projectData: IProject) => api.projects.createProject(projectData),
    onSuccess: (newProjectData: IProject) => {
      storage.projects.updateProject(newProjectData)
      const projects = storage.projects.getProjects()
      storage.projects.updateProjects([...projects, newProjectData])
      queryClient.invalidateQueries({queryKey: ['projects']});
    }
  })
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (projectData: IProject) => api.projects.updateProject(projectData),
    onSuccess: (newProjectData: IProject) => {
      storage.projects.updateProject(newProjectData)
      queryClient.invalidateQueries({queryKey: ['projects']});
    }
  })
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (projectId: string) => api.projects.deleteProject(projectId),
    onSuccess: () => {
      storage.projects.deleteProject()
      queryClient.invalidateQueries({queryKey: ['projects']});
    }
  })
};