import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import API from "../api"
import { IUser } from "../types"
import LStorage from "../localStorage"

const api = new API()
const storage = new LStorage()
const queryClient = new QueryClient()

export const useGetUsers = () => {
   return useQuery({ queryKey: ['users'], queryFn: api.users.getUsers })
}

export const useGetUserById = (userId: string) => {
   return useQuery({ queryKey: ['users'], queryFn: () => api.users.getUserById(userId) })
}

export const useGetUserByEmail = () => {
  return useMutation({ mutationFn: (email: string) => api.users.getUserByEmail(email),
    onSuccess: (newUserData: IUser) => {
      storage.users.updateUser(newUserData)
    }
  })
};

export const useCreateUser = () => {
  return useMutation({ mutationFn: api.users.createUser,
    onSuccess: (newUserData: IUser) => {
      storage.users.updateUser(newUserData)
      queryClient.invalidateQueries({queryKey: ['users']});
    }
  })
};

export const useUpdateUser = () => {
  return useMutation({ mutationFn: api.users.updateUserById,
    onSuccess: (newUserData: IUser) => {
      storage.users.updateUser(newUserData)
      queryClient.invalidateQueries({queryKey: ['users']});
    }
  })
};

export const useDeleteUser = () => {
  return useMutation({ mutationFn: api.users.deleteUser,
    onSuccess: (newUserData: IUser) => {
      storage.users.deleteUser()
      queryClient.invalidateQueries({queryKey: ['users']});
    }
  })
};