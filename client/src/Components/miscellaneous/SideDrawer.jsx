import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
} from "@chakra-ui/react";
import { BiSearch, BiBell, BiDownArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ProfileModel from "./ProfileModel";
import { logout } from "../../Action/authAction";
import { GetAllUsers } from "../../Action/usersAction";
import { AccessChat } from "../../Action/chatAction";
import LoadingComp from "../ExtraComponent/LoadingComp"
import UserList from "./UserList";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput , setsearchInput] = useState()
  const { authData } = useSelector((state) => state.auth);
  const { users  , Loading} = useSelector((state) => state.users);

  const SearchHandler = () => {
    dispatch(GetAllUsers(searchInput))
  }

  const accessChat = (usersid) => {
    dispatch(AccessChat(usersid))
    onClose()
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users" hasArrow placeContent="bottom-end">
          <Button variant="ghost" display="flex" gap="5px" onClick={onOpen}>
            <BiSearch size="20px" />
            <Text display={{ base: "none", md: "flex" }} px="4px">
              Search Users
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="xl">Chat Me</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Menu>
            <MenuButton p={1}>
              <BiBell size="25px" m={1} />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem >Logout</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<BiDownArrowAlt />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={authData.name}
                src={authData.profilePic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={authData}>
                <MenuItem >My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input 
                placeholder="Search By name"
                mr={2}
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
              />
              <Button onClick={SearchHandler}>Go</Button>
            </Box>
            {Loading ? <LoadingComp /> : (
              users?.map((users) => {
                return <UserList key={users._id} users={users} handleFunction ={() => accessChat(users._id)}/>
              })
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
