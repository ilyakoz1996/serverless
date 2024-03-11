import { SERVER_URL } from "@/core/constants"
import { ICreateInvoiceRequest } from "@/core/types"
import axios from "axios"

const createInvoice = async (invoiceRequest: ICreateInvoiceRequest): Promise<{invoiceId: string} | null> => {
    const invoice = await axios.post(`/api/processing`, invoiceRequest)
    if (!invoice.data) return null
    return invoice.data
}

export default { createInvoice }