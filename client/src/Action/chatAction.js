import {
    ACESSCHAT_REQUEST_START,
    ACESSCHAT_REQUEST_SCCUESS,
    ACESSCHAT_REQUEST_FAILED,

    FETCHCHAT_REQUEST_START,
    FETCHCHAT_REQUEST_SCCUESS,
    FETCHCHAT_REQUEST_FAILED,

    CREATEGROUP_REQUEST_START,
    CREATEGROUP_REQUEST_SCCUESS,
    CREATEGROUP_REQUEST_FAILED,
    
    CHANGE_GROUPNAME_START,
    CHANGE_GROUPNAME_SUCCESS,
    CHANGE_GROUPNAME_FAILED,

    ADD_USER_IN_GROUP_START,
    ADD_USER_IN_GROUP_SUCCESS,
    ADD_USER_IN_GROUP_FAILED,

    DELETEUSER_GROUP_START,
    DELETEUSER_GROUP_SUCCESS,
    DELETEUSER_GROUP_FAILED

} from "../Constants/ChatConstants"

import * as chatApi from "../Api/chatApi"

export const fetchAllChat = () => async (dispatch , state) => {
    dispatch({type : FETCHCHAT_REQUEST_START})
    try{
        const {data} = await chatApi.fetchAllChat()
        dispatch({type : FETCHCHAT_REQUEST_SCCUESS , payload : data})
    }catch(err){
        dispatch({type : FETCHCHAT_REQUEST_FAILED , payload : err})
    }
}

export const AccessChat = (userid) => async (dispatch , state) => {
    dispatch({type : ACESSCHAT_REQUEST_START})
    try{
        const {data} = await chatApi.accessChat(userid)
        dispatch({type : ACESSCHAT_REQUEST_SCCUESS , payload : data})
    }catch(err){
        dispatch({type : ACESSCHAT_REQUEST_FAILED , payload : err})
    }
    localStorage.setItem("existingchats" , JSON.stringify(state().chats.chats))
}

export const CreateGroup = (formData) => async (dispatch , state) => {
    dispatch({type : CREATEGROUP_REQUEST_START})
    try{
        const {data} = await chatApi.createGroup(formData)
        dispatch({type : CREATEGROUP_REQUEST_SCCUESS , payload : data})
    }catch(err){
        dispatch({type : CREATEGROUP_REQUEST_FAILED , payload : err})
    }
    localStorage.setItem("existingchats" , JSON.stringify(state().chats.chats))
}

export const changeName = (chatId , chatname) => async (dispatch) => {
    
    dispatch({ type: CHANGE_GROUPNAME_START });
    try {
        const {data} = await chatApi.changeGroupName(chatId , chatname)
      dispatch({ type: CHANGE_GROUPNAME_SUCCESS , payload : data });
    } catch (err) {
      dispatch({ type: CHANGE_GROUPNAME_FAILED });
    }
  };

export const AddUserToGroup = (userId , chatId) => async (dispatch) => {
    
    dispatch({ type: ADD_USER_IN_GROUP_START });
    try {
        const {data} = await chatApi.addUser(userId , chatId)
      dispatch({ type: ADD_USER_IN_GROUP_SUCCESS , payload : data });
    } catch (err) {
      dispatch({ type: ADD_USER_IN_GROUP_FAILED , payload : err});
    }
  };

export const deleteFromGroup = (userId , chatId) => async (dispatch) => {
    
    dispatch({ type: DELETEUSER_GROUP_START });
    try {
        await chatApi.removeUserFromGroup(userId , chatId)
      dispatch({ type: DELETEUSER_GROUP_SUCCESS , payload : userId });
    } catch (err) {
      dispatch({ type: DELETEUSER_GROUP_FAILED , payload : err});
    }
  };