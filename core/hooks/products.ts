import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../api"
import { IProduct } from "../types"

const api = new API()

export const useGetProducts = () => {
   return useQuery({ queryKey: ['products'], queryFn: () => api.products.getProducts() })
}
export const useGetProductsByProjectId = (projectId: string) => {
   return useQuery({ queryKey: ['products', projectId], queryFn: () => api.products.getProductsByProjectId(projectId) })
}
export const useGetProduct = (productId: string | undefined) => {
   return useQuery({ queryKey: ['products', productId], queryFn: () => api.products.getProduct(productId!), enabled: !!productId })
}
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  console.log('queryClient', queryClient)
  return useMutation({ mutationFn: (productData: IProduct) => api.products.createProduct(productData),
    onSuccess: (newProductData: IProduct) => {
      console.log('queryClient AFTER', queryClient)
      queryClient.invalidateQueries({queryKey: ['products']});
    }
  })
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (productData: IProduct) => api.products.updateProduct(productData),
    onSuccess: (newProductData: IProduct) => {
      queryClient.invalidateQueries({queryKey: ['products']});
    }
  })
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (productId: string) => api.products.deleteProduct(productId),
    onSuccess: (newProductData: IProduct) => {
      queryClient.invalidateQueries({queryKey: ['products']});
    }
  })
};