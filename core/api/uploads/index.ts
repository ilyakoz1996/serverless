import { SERVER_URL } from "@/core/constants"
import axios from "axios"

const uploadImage = async (file: any) => {
    const uploaded = await axios.post(`${SERVER_URL}/upload/image`, {
        image: file
    })
    if (!uploaded.data) return null
    return uploaded.data
}

export default { uploadImage }