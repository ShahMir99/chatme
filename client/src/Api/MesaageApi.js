import axios from "axios";
const API = axios.create({baseURL : "https://powerful-tam-foal.cyclic.app/"})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
  }
  return req;
});

export const sendMessageApi = (formdata) => API.post(`/message/`, formdata);

export const getChatMessage = (chatID) => API.get(`/message/chat/${chatID}`);