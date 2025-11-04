import axios from "axios"


const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_IPFS_URL
})

console.log("API Base URL:", api.defaults.baseURL);


export default api;
