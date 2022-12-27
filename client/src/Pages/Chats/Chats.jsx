import React from 'react'
import {Box} from "@chakra-ui/react"
import SideDrawer from '../../Components/miscellaneous/SideDrawer'
import ChatBox from "../../Components/miscellaneous/ChatBox"
import MyChats from "../../Components/miscellaneous/MyChats"

const Auth = () => {
  return (
    <div>
      <SideDrawer />
      <Box w='100%' height="92vh" padding="10px" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  )
}

export default Auth