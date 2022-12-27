import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "../ExtraComponent/SingleChat";

const ChatBox = () => {
  const { SelectedChat } = useSelector((state) => state.SelectedChat);
  return (
    <Box
      display={{ base: SelectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      h="100%"
    >
      <SingleChat SelectedChat={SelectedChat} />
    </Box>
  );
};

export default ChatBox;
