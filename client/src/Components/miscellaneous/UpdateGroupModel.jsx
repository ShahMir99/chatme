import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import UserCircle from "../ExtraComponent/UserCircle";
import { AddUserToGroup, changeName, deleteFromGroup } from "../../Action/chatAction";
import { getalluserApi } from "../../Api/UserApi";
import UserList from "./UserList";

const UpdateGroupModel = ({ children }) => {
  const dispatch = useDispatch();
  const { SelectedChat } = useSelector((state) => state.SelectedChat);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [GroupName, SetGroupName] = useState("");
  const [SearchUser, SetSearchUser] = useState([]);
  const [Loading, SetLoading] = useState(false);

  const handleDelete = (userID) => {
    dispatch(deleteFromGroup(userID , SelectedChat._id))
  };

  const handleRename = () => {
    dispatch(changeName(SelectedChat._id , GroupName));
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    try {
      SetLoading(true);
      const { data } = await getalluserApi(value);
      SetSearchUser(data);
      SetLoading(false);
    } catch (err) {
      console.log(err);
      SetLoading(false);
    }
  };

  const addUser = (userID) => {
    dispatch(AddUserToGroup(userID , SelectedChat._id))
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="3xl">{SelectedChat.chatname}</ModalHeader>
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
          >
            <Box w="100%" display="flex" flexWrap='wrap' pb={3}>
              {SelectedChat.users.map((user) => (
                <UserCircle
                  key={user._id}
                  users={user}
                  handlerFunction={() => handleDelete(user._id)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={GroupName}
                onChange={(e) => SetGroupName(e.target.value)}
                autoComplete='off'
              />
              <Button ml={3} onClick={handleRename}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={3}
                autoComplete='off'
                onChange={handleSearch}
              />
            </FormControl>
            <Box w="100%" >
                {Loading
                  ? "Loading..."
                  : SearchUser?.slice(0, 3).map((users) => {
                      return (
                        <UserList
                          key={users._id}
                          users={users}
                          handleFunction={() => addUser(users._id)}
                        />
                      );
                    })}
              </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupModel;
