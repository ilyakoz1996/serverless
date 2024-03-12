import { PRICES_SERVER } from '@/core/constants';
import { IToken } from '@/core/types';
import axios from 'axios'

class TokensService {
  async getTokens(): Promise<IToken[]> {
    const tokens = (await axios.get(`${PRICES_SERVER}/tokens`)).data
    return tokens;
  }
  async getToken(tokenId: number):Promise<IToken> {
    const token = (await axios.get(`${PRICES_SERVER}/token/${tokenId}`)).data
    return token;
  }
}

export default TokensService;
