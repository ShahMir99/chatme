import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { getalluserApi } from "../../Api/UserApi";
import UserList from "./UserList";
import UserCircle from "../ExtraComponent/UserCircle";
import {useDispatch} from "react-redux"
import { CreateGroup } from "../../Action/chatAction";

const GroupChatModel = ({ children }) => {
  const toast = useToast();
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [GroupName, SetGroupName] = useState("");
  const [SearchUser, SetSearchUser] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [SelectedUser, SetSelectedUser] = useState([]);

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

  const handleDelete = (userDeleteing) => {
    SetSelectedUser(
      SelectedUser.filter((filterUSer) => filterUSer._id !== userDeleteing._id)
    );
  };

  const SubmitHandler = () => {
    if (!GroupName) {
      return toast({
        title: "Warning",
        description: "Group Name is Missing",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
    }

    if (SelectedUser.length < 2) {
      return toast({
        title: "Warning",
        description: "You Have At Least 3 Users To Create Group",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
    }
    const formData = {
      GroupName,
      SelectedUser: JSON.stringify(SelectedUser.map((user) => user._id)),
    };
    
    dispatch(CreateGroup(formData))
    onClose()
  };

  const accessChat = (user) => {
    const find = SelectedUser.find((finded) => finded._id === user._id);
    if (!find) {
      SetSelectedUser([...SelectedUser, user]);
    } else {
      toast({
        title: "Warning",
        description: "User Already present in This Group",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="25px">
            Create New Group
          </ModalHeader>
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
          >
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              flexDirection="column"
              h="100%"
            >
              <Input
                placeholder="Group Name"
                m={2}
                autoFocus
                onChange={(e) => SetGroupName(e.target.value)}
              />
              <Input placeholder="Search User" m={2} onChange={handleSearch } />
              <Box
                w="100%"
                m={1}
                display="flex"
                alignItems="center"
                flexWrap="wrap"
              >
                {SelectedUser.map((user) => (
                  <UserCircle
                    key={user._id}
                    users={user}
                    handlerFunction={() => handleDelete(user)}
                  />
                ))}
              </Box>
              <Box w="100%">
                {Loading
                  ? "Loading..."
                  : SearchUser?.slice(0, 3).map((users) => {
                      return (
                        <UserList
                          key={users._id}
                          users={users}
                          handleFunction={() => accessChat(users)}
                        />
                      );
                    })}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={SubmitHandler}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;
