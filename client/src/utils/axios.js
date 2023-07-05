import axios from 'axios'

const instance = axios.create({
  baseURL: "https://build-dream-server.onrender.com",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token
    return config
}, (error) => {
    return Promise.reject(error)
})


export default instance;