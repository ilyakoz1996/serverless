import { SERVER_URL } from "@/core/constants"
import { IProduct } from "@/core/types"
import axios from "axios"

const getProduct = async (id: string): Promise<IProduct> => {
    const product = await axios.get(`/api/products?productId=${id}`)
    return product.data
}
const getProductsByProjectId = async (projectId: string): Promise<IProduct[] | []> => {
    const products = await axios.get(`/api/products?projectId=${projectId}`)
    if (!products.data) return []
    return products.data
}
const getProducts = async (): Promise<IProduct[] | []> => {
    const products = await axios.get(`/api/products`)
    if (!products.data) return []
    return products.data
}

const createProduct = async (productData: IProduct): Promise<IProduct> => {
    const product = await axios.post(`/api/products`, productData)
    return product.data
}

const updateProduct = async (productData: IProduct): Promise<IProduct> => {
    const product = await axios.put(`/api/products?productId=${productData.id}`, productData)
    return product.data
}

const deleteProduct = async (id: string): Promise<IProduct> => {
    const product = await axios.delete(`/api/products?productId=${id}`)
    return product.data
}

export default { getProducts, getProductsByProjectId, getProduct, createProduct, updateProduct, deleteProduct }