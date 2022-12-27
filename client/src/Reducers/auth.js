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

export const auth = (state = { authData: null , Loading : false , error : false}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST_START:
      return { ...state, Loading :true };

    case SIGNUP_REQUEST_SUCCESSFULL:
      return { ...state, authData: action.payload ,  Loading :false};

    case SIGNUP_REQUEST_FAILED:
      return { ...state, error : action.payload , Loading : false};

    case LOGIN_REQUEST_START:
      return { ...state, Loading :true };

    case LOGIN_REQUEST_SUCCESSFULL:
      return { ...state, authData: action.payload , Loading :false};

    case LOGIN_REQUEST_FAILED:
      return { ...state, error : action.payload , Loading : false};

    case LOG_OUT:
      return { ...state, authData : null};

    case CLEAR_ERROR:
      return { ...state, error : null};

    default:
      return state;
  }
};
