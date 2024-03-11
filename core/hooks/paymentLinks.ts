import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../api"
import { IPaymentLink } from "../types"

const api = new API()

export const useGetPaymentLinks = () => {
   return useQuery({ queryKey: ['paymentLinks'], queryFn: () => api.paymentLinks.getPaymentLinks() })
}
export const useGetPaymentLinksByProjectId = (projectId: string | undefined) => {
   return useQuery({ queryKey: ['paymentLinks', projectId], queryFn: () => api.paymentLinks.getPaymentLinksByProjectId(projectId!), enabled: !!projectId })
}
export const useGetPaymentLinksByProductId = (productId: string | undefined) => {
   return useQuery({ queryKey: ['paymentLinks', productId], queryFn: () => api.paymentLinks.getPaymentLinksByProductId(productId!), enabled: !!productId })
}
export const useGetPaymentLinkByInvoiceId = (invoiceId: string | undefined) => {
   return useQuery({ queryKey: ['paymentLinks', invoiceId], queryFn: () => api.paymentLinks.getPaymentLinkByInvoiceId(invoiceId!), enabled: !!invoiceId })
}
export const useGetPaymentLinkById = (paymentLinkId: string | undefined) => {
   return useQuery({ queryKey: ['paymentLinks', paymentLinkId], queryFn: () => api.paymentLinks.getPaymentLinkById(paymentLinkId!), enabled: !!paymentLinkId })
}

export const useCreatePaymentLink = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (paymentLinkData: IPaymentLink) => api.paymentLinks.createPaymentLink(paymentLinkData),
    onSuccess: (newPaymentLinkData: IPaymentLink) => {
      queryClient.invalidateQueries({queryKey: ['paymentLinks']});
    }
  })
};

export const useUpdatePaymentLink = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (paymentLinkData: IPaymentLink) => api.paymentLinks.updatePaymentLink(paymentLinkData),
    onSuccess: (newPaymentLinkData: IPaymentLink) => {
      queryClient.invalidateQueries({queryKey: ['paymentLinks']});
    }
  })
};

export const useDeletePaymenLink = () => {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: (paymentLinkId: string) => api.paymentLinks.deletePaymentLink(paymentLinkId),
    onSuccess: (newPaymentLinkData: IPaymentLink) => {
      queryClient.invalidateQueries({queryKey: ['paymentLinks']});
    }
  })
};