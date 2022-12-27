import axios from "axios";
const API = axios.create({ baseURL: "" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
  }
  return req;
});

export const accessChat = (userId) => API.post(`/chats/`, { userId });

export const fetchAllChat = (userId) => API.get(`/chats/${userId}`);

export const createGroup = (formData) => API.post(`/chats/group` , {name : formData.GroupName , users : formData.SelectedUser});

export const changeGroupName = (chatId , chatname) => API.put(`/chats/rename` , {chatId , chatname});

export const addUser = (userId , chatId) => API.put(`/chats/addtogroup` , {chatId , userId});

export const removeUserFromGroup = (userId , chatId) => API.put(`/chats/removeuser` , {chatId , userId});
