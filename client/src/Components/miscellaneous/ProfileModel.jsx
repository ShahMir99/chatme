import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import defaultdp from "../../images/defaultDp.png"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
} from "@chakra-ui/react";

const ProfileModel = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="310px">
          <ModalCloseButton />
          <ModalHeader textAlign="center">{user && user.name}</ModalHeader>
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              textAlign="center"
              src={user.profilePic ? user.profilePic : defaultdp }
            />
            <Text fontSize="20px" textAlign="center">
              {user && user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
