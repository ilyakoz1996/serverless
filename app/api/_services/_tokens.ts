import { IToken } from '@/core/types';
import axios from 'axios'

const serverUrl = process.env.RATES_SERVER

class TokensService {
  async getTokens(): Promise<IToken[]> {
    const tokens = (await axios.get(`${serverUrl}/tokens`)).data
    return tokens;
  }
  async getToken(tokenId: number):Promise<IToken> {
    const token = (await axios.get(`${serverUrl}/token/${tokenId}`)).data
    return token;
  }
}

export default TokensService;
