import { useQuery } from "@tanstack/react-query"
import API from "../api"

const api = new API()

export const useGetTokens = () => {
   return useQuery({ queryKey: ['tokens'], queryFn: () => api.tokens.getTokens() })
}
export const useGetToken = (tokenId: number | null | undefined) => {
   return useQuery({ queryKey: ['token'], queryFn: () => api.tokens.getToken(tokenId!), enabled: !!tokenId })
}