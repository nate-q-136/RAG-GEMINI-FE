import axios from "axios"
import serverUrls from "./serverUrls"

const http = axios.create({
    baseURL: serverUrls.http,
    timeout: 30000,
})

export default http