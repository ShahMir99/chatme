import axios from "axios";
// const API = axios.create({baseURL : "http://localhost:5000/"})



export const signup = (formdata) => axios.post("/auth/register" , formdata)

export const signin = (formdata) => axios.post("/auth/login" , formdata )