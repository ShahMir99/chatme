import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ScrollAbleFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameUser, sameSenderMargin } from "../../config/chatnameLogic";
import {format} from "timeago.js"

const ScrollAbleChat = ({ message }) => {
  const { authData } = useSelector((state) => state.auth);
  const { SelectedChat } = useSelector((state) => state.SelectedChat);
  return (
    <ScrollAbleFeed style={{height : '100%'}}>
      {message &&
        message.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {m.sender._id !== authData._id && 
              <Tooltip
                label={m.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                display={SelectedChat.isGroupChat ? "" : "none"}
                  mt="17px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.profilePic}
                />
              </Tooltip>
            }
                <span style={{
                    backgroundColor : `${m.sender._id === authData._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius : "20px",
                    borderBottomLeftRadius : m.sender._id !== authData._id ? "0" : "20px",
                    borderBottomRightRadius : m.sender._id === authData._id ? "0" : "20px",
                    padding : "0px 15px",
                    maxWidth : "75%",
                    fontSize : "14px",
                    marginLeft : sameSenderMargin(message , m , i , authData._id),
                    marginTop : isSameSender(message , m , i , authData._id) ? 3 : 10,

                }}>
                    {m.content}
                    <p style={{fontSize : "10px" , textAlign:"right"}} >{format(m.createdAt)}</p>
                </span>
          </div>
        ))}
    </ScrollAbleFeed>
  );
};


export default ScrollAbleChat;
