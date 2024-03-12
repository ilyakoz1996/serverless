import axios from 'axios'
import { AUTH_SERVER_URL, CLIENT_ID, CLIENT_URL, SERVER_URL } from './core/constants'

const updateLinks = async () => {
    const updateUrl = await axios.get(`${AUTH_SERVER_URL}/updateApp?clientId=${CLIENT_ID}&websiteUrl=${CLIENT_URL}&callbackUrl=${SERVER_URL}/api/auth?callback=true`)
    return updateUrl
}

export default updateLinks()