import {
  FETCHCHAT_REQUEST_START,
  FETCHCHAT_REQUEST_SCCUESS,
  FETCHCHAT_REQUEST_FAILED,
  ACESSCHAT_REQUEST_START,
  ACESSCHAT_REQUEST_SCCUESS,
  ACESSCHAT_REQUEST_FAILED,

  CREATEGROUP_REQUEST_START,
  CREATEGROUP_REQUEST_SCCUESS,
  CREATEGROUP_REQUEST_FAILED,

  CHANGE_GROUPNAME_SUCCESS
} from "../Constants/ChatConstants";
import {LOG_OUT} from "../Constants/AuthConstants"

const chats = (state = { chats: [], Loading: false, error: null }, action) => {
  switch (action.type) {
    // ======> case for Fetching data
    case FETCHCHAT_REQUEST_START:
      return { ...state, Loading: true };

    case FETCHCHAT_REQUEST_SCCUESS:
      return { ...state, chats: action.payload, Loading: false };

    case CHANGE_GROUPNAME_SUCCESS:
      return { ...state, chats: [...state.chats.map((user) => user._id === action.payload._id ? action.payload : user)], Loading: false };

    case FETCHCHAT_REQUEST_FAILED:
      return { ...state, error: action.payload };


      // ======> case for Accessing chats


    case ACESSCHAT_REQUEST_START:
      return { ...state, Loading: true };

    case ACESSCHAT_REQUEST_SCCUESS:

      const find = state.chats.find((chat) => chat._id === action.payload._id)
      if(find){
        return { ...state, chats: [find ,...state.chats.filter((chat) => chat._id !== action.payload._id)], Loading: false };
      }else{
        return { ...state, chats: [action.payload ,...state.chats], Loading: false };
      }

    case ACESSCHAT_REQUEST_FAILED:
      return { ...state, error: action.payload };


      
      // ======> case for Group creatiion and existing

      case CREATEGROUP_REQUEST_START:
        return { ...state, Loading: true };
  
      case CREATEGROUP_REQUEST_SCCUESS:
        return { ...state, chats: [action.payload , ...state.chats.map((chat) => chat)], Loading: false };
  
      case CREATEGROUP_REQUEST_FAILED:
        return { ...state, error: action.payload };
        
        
      case LOG_OUT:
        return { ...state, chats: [] };

    default:
      return state;
  }
};

export default chats;
