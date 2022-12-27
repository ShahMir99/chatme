import {
  SELECTED_CHAT,
} from "../Constants/SelectedChatComstant";

export const SelectChat = (selectedChat) => {
  return {
    type: SELECTED_CHAT,
    payload: selectedChat,
  };
};

// export const IsLogin = (loginStatus) => {
//   return {
//     type: "CHECK_IS_LOGIN",
//     payload: loginStatus,
//   }
// }