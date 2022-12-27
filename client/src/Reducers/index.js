import { combineReducers } from "redux";
import { auth } from "./auth";
import { users } from "./users";
import chats from "./chat";
import SelectedChatReducer from "./selectedChat";

export const reducers = combineReducers({
    auth,
    users,
    chats,
    SelectedChat : SelectedChatReducer
})
