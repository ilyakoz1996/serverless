import { IPaymentLink } from "@/core/types"
import axios from "axios"

const getPaymentLinkById = async (id: string): Promise<IPaymentLink | null> => {
    const link = await axios.get(`/api/paymentLinks?paymentLinkId=${id}`)
    if (!link.data) return null
    return link.data
}
const getPaymentLinkByInvoiceId = async (invoiceId: string): Promise<IPaymentLink | null> => {
    const link = await axios.get(`/api/paymentLinks?invoiceId=${invoiceId}`)
    if (!link.data) return null
    return link.data
}
const getPaymentLinksByProjectId = async (projectId: string): Promise<IPaymentLink[] | []> => {
    const links = await axios.get(`/api/paymentLinks?projectId=${projectId}`)
    if (!links.data) return []
    return links.data
}
const getPaymentLinksByProductId = async (productId: string): Promise<IPaymentLink[] | []> => {
    const links = await axios.get(`/pai/paymentLinks?productId=${productId}`)
    if (!links.data) return []
    return links.data
}
const getPaymentLinks = async (): Promise<IPaymentLink[] | []> => {
    const links = await axios.get(`/api/paymentLinks`)
    if (!links.data) return []
    return links.data
}
const createPaymentLink = async (invoiceData: IPaymentLink): Promise<IPaymentLink> => {
    const link = await axios.post(`/api/paymentLinks`, invoiceData)
    return link.data
}
const updatePaymentLink = async (paymentLink: IPaymentLink): Promise<IPaymentLink> => {
    const link = await axios.put(`/api/paymentLinks?paymentLinkId=${paymentLink.id}`, {
        invoiceId: paymentLink.invoiceId,
        price: Number(paymentLink.price)
    })
    return link.data
}
const deletePaymentLink = async (id: string): Promise<IPaymentLink> => {
    const link = await axios.delete(`/api/paymentLinks?paymentLinkId=${id}`)
    return link.data
}

export default { getPaymentLinks, getPaymentLinksByProjectId, getPaymentLinksByProductId, getPaymentLinkById, getPaymentLinkByInvoiceId, createPaymentLink, updatePaymentLink, deletePaymentLink }