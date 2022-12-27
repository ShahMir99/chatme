import * as UserApi from "../Api/UserApi"
import {
  GET_USER_START,
  GET_USER_SUCCESSFULL,
  GET_USER_FAILED,
} from "../Constants/usersConstant";


export const GetAllUsers = (pressKey) => async (dispatch) => {
  dispatch({ type: GET_USER_START })
  try{
    const {data} = await UserApi.getalluserApi(pressKey)
    dispatch({ type: GET_USER_SUCCESSFULL , payload : data})
  }catch(err){
    dispatch({ type: GET_USER_FAILED , payload : err})
  }
};
