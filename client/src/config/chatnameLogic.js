export const getSender = (user, loggedUser) => {
  return user[0]._id.toString() === loggedUser ? user[1].name : user[0].name;
};

export const getSenderImage = (user, loggedUser) => {
  return user[0]._id.toString() === loggedUser ? user[1].profilePic : user[0].profilePic;
};

export const getFullSender = (user, loggedUser) => {
  return user[0]._id.toString() === loggedUser ? user[1] : user[0];
};

export const isSameUser = (message, m, i, loggedUser) => {
  // return (
  //   i < message.length - 1 &&
  //   (message[i + 1].sender._id !== m.sender._id ||
  //     message[i + 1].sender._id === undefined) &&
  //   message[i].sender._id !== loggedUser
  // );  
};



export const isLastMessage = (message, i, loggedUser) => {
  return (
    i === message.length - 1 &&
    message[message.length - 1].sender._id !== loggedUser &&
    message[message.length - 1].sender._id
  );
};

export const sameSenderMargin = (message, m, i, loggedUser) => {
  if (m.chatId.isGroupChat) {
    if (
      i < message.length - 1 &&
      message[i + 1].sender._id === m.sender._id &&
      message[i].sender._id !== loggedUser
    ) {
      return 0;
    } else if (
      (i < message.length - 1 &&
        message[i + 1].sender._id !== m.sender._id &&
        message[i].sender._id !== loggedUser) ||
      (i === message.length - 1 && message[i].sender._id !== loggedUser)
    ) {
      return 0;
    } else return "auto";
  } else {
    if (
      i < message.length - 1 &&
      message[i + 1].sender._id === m.sender._id &&
      message[i].sender._id !== loggedUser
    ) {
      return 0;
    } else if (
      (i < message.length - 1 &&
        message[i + 1].sender._id !== m.sender._id &&
        message[i].sender._id !== loggedUser) ||
      (i === message.length - 1 && message[i].sender._id !== loggedUser)
    ) {
      return 0;
    } else return "auto";
  }
};

export const isSameSender = (message, m, i) => {
  return i > 0 && message[i - 1].sender._id === m.sender._id;
};
