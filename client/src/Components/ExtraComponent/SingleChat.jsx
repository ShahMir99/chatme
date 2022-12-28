import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { TiEye } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { SelectChat } from "../../Action/SelectedChat";
import { getFullSender, getSender } from "../../config/chatnameLogic";
import ProfileModel from "../miscellaneous/ProfileModel";
import UpdateGroupModel from "../miscellaneous/UpdateGroupModel";
import { getChatMessage, sendMessageApi } from "../../Api/MesaageApi";
import { useEffect } from "react";
import {IoMdSend} from "react-icons/io"
import ScrollAbleChat from "./ScrollAbleChat";
import { io } from "socket.io-client"
import { fetchAllChat } from "../../Action/chatAction";

const ENDPOINT = "https://powerful-tam-foal.cyclic.app";
var socket , socketChatCompare;



const SingleChat = ({ SelectedChat }) => {

  //   useEffect(() => {
  //   socket = io()
  //   socket.emit("setup" , authData)
  // },[]);



  const dispatch = useDispatch();

  const { authData } = useSelector((state) => state.auth);
  const [message, setmessage] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");


  const FetchingSelectedChat = async () => {
    if (SelectedChat) {
      try {
        setLoading(true);
        const { data } = await getChatMessage(SelectedChat._id);
        setmessage(data)
        setLoading(false);
        // socket.emit("Join chat" , SelectedChat._id)
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      const formdata = {
        content: newMessage,
        chatId: SelectedChat._id,
      };
      try {
        const { data } = await sendMessageApi(formdata);
        setNewMessage("");
        setmessage([...message, data]);
        // socket.emit("new Message" , data)
      } catch (err) {
        console.log(err);
      }
    }
  };




  useEffect(() => {
    // socket.on("message Received" , (newMessageReceived) => {
    //   if(!socketChatCompare || socketChatCompare._id !== newMessageReceived.chatId._id) {
    //     // Give Notification
    //     dispatch(fetchAllChat());
    //   }else{
    //     setmessage([...message , newMessageReceived])
    //   }
    // })
  });

  useEffect(() => {
    FetchingSelectedChat();

    socketChatCompare = SelectedChat
  }, [SelectedChat]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {SelectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<BiArrowBack />}
              onClick={() => dispatch(SelectChat(null))}
            />
            {!SelectedChat.isGroupChat ? (
              <>
                {getSender(SelectedChat.users, authData._id)}
                <ProfileModel
                  user={getFullSender(SelectedChat.users, authData._id)}
                >
                  <IconButton
                    display={{ base: "flex", md: "flex" }}
                    icon={<TiEye size={25} />}
                  />
                </ProfileModel>
              </>
            ) : (
              <>
                {SelectedChat.chatname}

                
                <UpdateGroupModel>
                  <IconButton
                    display={{ base: "flex", md: "flex" }}
                    icon={<TiEye size={25} />}
                  />
                </UpdateGroupModel>
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {Loading ? (
              <Spinner
                size="2xl"
                h={20}
                w={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="message_box">
                <ScrollAbleChat message={message}/>
              </div>
            )}

            <FormControl mt={5} onKeyDown={(event) => event.key === "Enter" ? sendMessage() : ""}>
            <InputGroup>
              <Input
                placeholder="Write Something"
                onChange={handleTyping}
                value={newMessage}
                autoComplete="off"
                bg="white"
                
              />
              <InputRightElement>
                <IoMdSend size={23} color="#38B2AC" cursor="pointer" onClick={sendMessage}/>
              </InputRightElement>
            </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="2xl" pb={3}>
            Click on a User To Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
