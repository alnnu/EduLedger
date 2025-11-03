import axios from "axios"


const api = axios.create({

  baseURL: "/api/ipfs"
})

console.log("API Base URL:", api.defaults.baseURL);


export default api;
