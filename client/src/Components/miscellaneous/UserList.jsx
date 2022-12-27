import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserList = ({ users , handleFunction}) => {

  return (
    <>
      <Box
        w="100%"
        bg="#E8E8E8"
        _hover={{
          background: "#38B2Ac",
          color: "white",
        }}
        display="flex"
        alignItems="center"
        color="black"
        cursor="pointer"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
        onClick={handleFunction}
      >
        <Avatar mr={2} size="sm" src={users.profilePic && users.profilePic} />
        <Text>
          {users.name}
          <Text fontSize="xs">Email : {users.email}</Text>
        </Text>
      </Box>
    </>
  );
};

export default UserList;
