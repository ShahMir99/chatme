import React, { useEffect } from "react";
import { Avatar, Box, Button, Stack, Text } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChat } from "../../Action/chatAction";
import LoadingComp from "../ExtraComponent/LoadingComp";
import { getSender, getSenderImage } from "../../config/chatnameLogic";
import GroupChatModel from "./GroupChatModel";
import { SelectChat } from "../../Action/SelectedChat";
import moment from "moment"

const MyChats = () => {
  const { SelectedChat } = useSelector((state) => state.SelectedChat);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chats);
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllChat());
  }, [dispatch]);

  return (
    <>
      <Box
        display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        alignItems="center"
        p={3}
        w={{ base: "100%", md: "31%" }}
        h="100%"
        bg="white"
        borderRadius="lg"
      >
        <Box
          pb={3}
          px={3}
          fontSize="28px"
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          My Chats
          <GroupChatModel>
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AiOutlinePlus />}
            >
              New Group{" "}
            </Button>
          </GroupChatModel>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="92%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="auto">
              {chats.length > 0 &&
                chats.map((chatlist) => (
                  <Box
                    onClick={() => dispatch(SelectChat(chatlist))}
                    cursor="pointer"
                    bg={SelectedChat === chatlist ? "#38B2AC" : "#E8E8E8"}
                    color={SelectedChat === chatlist ? "white" : "black"}
                    px={2}
                    py={2}
                    display="flex"
                    justifyContent="space-between"
                    borderRadius="lg"
                    key={chatlist?._id}
                  >
                    <Box display="flex" alignItems="center" gap="10px">
                      <Avatar
                        w="40px"
                        h="40px"
                        src={!chatlist.isGroupChat && getSenderImage(chatlist?.users, authData._id)}
                        name={
                          !chatlist?.isGroupChat
                            ? getSender(chatlist?.users, authData._id)
                            : chatlist.chatname
                        }
                      />
                      <Text fontWeight="600">
                        {!chatlist?.isGroupChat ? (
                          <>
                            {getSender(chatlist?.users, authData._id)}
                            <Text fontWeight="400">
                              {chatlist.latestMessage?.content.length > 30 ? (chatlist.latestMessage?.content.slice(0,33) +"..." ) : chatlist.latestMessage?.content}
                            </Text>
                          </>
                        ) : (
                          <>
                            {chatlist.chatname}
                            <Text>Group Chat</Text>
                          </>
                        )}
                      </Text>
                    </Box>
                    <Text fontSize="14px">
                      {moment(chatlist.latestMessage?.createdAt).calendar()}
                    </Text>
                  </Box>
                ))}
            </Stack>
          ) : (
            <LoadingComp />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
