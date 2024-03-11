import { PRICES_SERVER } from "@/core/constants"
import { IToken } from "@/core/types"
import axios from "axios"

const getTokens = async (): Promise<IToken[] | []> => {
    const tokens = await axios.get(`${PRICES_SERVER}/tokens`)
    if (!tokens.data) return []
    return tokens.data
}
const getToken = async (tokenId: number): Promise<IToken> => {
    const token = await axios.get(`${PRICES_SERVER}/token/${tokenId}`)
    return token.data
}

export default { getTokens, getToken }