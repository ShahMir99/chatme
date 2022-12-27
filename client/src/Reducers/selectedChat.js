import { SELECTED_CHAT } from "../Constants/SelectedChatComstant";
import { CHANGE_GROUPNAME_SUCCESS , ADD_USER_IN_GROUP_SUCCESS , DELETEUSER_GROUP_SUCCESS} from "../Constants/ChatConstants";
import {LOG_OUT} from "../Constants/AuthConstants"


const SelectedChatReducer = (state = { SelectedChat : null }, action) => {
  switch (action.type) {
    case SELECTED_CHAT:
      return { ...state, SelectedChat: action.payload };

    case CHANGE_GROUPNAME_SUCCESS:
      return { ...state, SelectedChat: action.payload};

    case ADD_USER_IN_GROUP_SUCCESS:
      return { ...state, SelectedChat: action.payload};

    case DELETEUSER_GROUP_SUCCESS:
      return { ...state, SelectedChat: {...state.SelectedChat , users : [...state.SelectedChat.users.filter((user) => user._id !== action.payload)]} };

      case LOG_OUT :
        return { ...state, SelectedChat: null };


    default:
      return state;
  }
};


export default SelectedChatReducer;