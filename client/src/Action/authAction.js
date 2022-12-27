import * as AuthApi from "../Api/AuthApi" 
import {
  SIGNUP_REQUEST_START,
  SIGNUP_REQUEST_SUCCESSFULL,
  SIGNUP_REQUEST_FAILED,

  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESSFULL,
  LOGIN_REQUEST_FAILED,

  LOG_OUT,
  CLEAR_ERROR
} from "../Constants/AuthConstants";

export const signup = (formData) => async (dispatch , state) => {
  dispatch({ type: SIGNUP_REQUEST_START });
  try {
    const {data} = await AuthApi.signup(formData);
    dispatch({ type: SIGNUP_REQUEST_SUCCESSFULL  , payload : data});
  } catch (err) {
    dispatch({ type: SIGNUP_REQUEST_FAILED , payload : err});
  }
  localStorage.setItem("userInfo" , JSON.stringify(state().auth.authData))
};

export const login = (formData) => async (dispatch , state) => {
  dispatch({ type: LOGIN_REQUEST_START });
  try {
    const {data} = await AuthApi.signin(formData);
    dispatch({ type: LOGIN_REQUEST_SUCCESSFULL  , payload : data});
  } catch (err) {
    dispatch({ type: LOGIN_REQUEST_FAILED , payload : err});
  }
  localStorage.setItem("userInfo" , JSON.stringify(state().auth.authData))
};

export const logout = () => async (dispatch , state) => {
  dispatch({ type: LOG_OUT });
  localStorage.setItem("userInfo" , JSON.stringify(state().auth.authData))
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
