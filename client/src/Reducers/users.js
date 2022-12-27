import {
  GET_USER_START,
  GET_USER_SUCCESSFULL,
  GET_USER_FAILED,
} from "../Constants/usersConstant";


export const users = (state ={ users: []  , Loading : false , error : false} , action) => {

  switch (action.type) {
    case GET_USER_START:
      return {...state , Loading : true}

    case GET_USER_SUCCESSFULL:
      return {...state , users : action.payload , Loading : false , error : false}

    case GET_USER_FAILED:
      return {...state , Loading : false , error : action.payload}
        
    default:
      return state;
  }
}
