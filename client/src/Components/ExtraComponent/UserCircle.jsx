import { Box } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import React from "react";

const UserCircle = ({ users , handlerFunction}) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={15}
      cursor="pointer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bg="purple"
      color="white"
      onClick = {handlerFunction}
    >
      {users.name}<RxCross2 style={{marginTop : '2px'}}/>
    </Box>
  );
};

export default UserCircle;
