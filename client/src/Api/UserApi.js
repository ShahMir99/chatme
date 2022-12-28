import axios from "axios";
const API = axios.create({baseURL : ""})



API.interceptors.request.use((req) => {
  if(localStorage.getItem("userInfo")){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
  }
  return req;
})

export const getalluserApi = (pressKey) => API.get(`/auth/allusers?search=${pressKey}`);
