import axios from "axios";
const API = axios.create({baseURL : ""})



export const signup = (formdata) => API.post("/auth/register" , formdata)

export const signin = (formdata) => API.post("/auth/login" , formdata )