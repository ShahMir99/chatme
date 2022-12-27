import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Action/authAction";

const Register = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [showPass, setshowPass] = useState(false);
  const [showConPass, setshowConPass] = useState(false);
  const [uploaded, setuploaded] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    profilePic: "",
  });

  const { Loading } = useSelector((state) => state.auth);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setformData((preval) => {
      return { ...preval, [name]: value };
    });
  };

  const showPassHandler = () => {
    setshowPass((preval) => !preval);
  };

  const showConPassHandler = () => {
    setshowConPass((preval) => !preval);
  };

  const setimage = (pics) => {
    if (pics.type.substr(0, 5) !== "image") {
      toast({
        title: "Uploading Fail",
        description: "Please Select an Image",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
    } else {
      var FETCH_URL = "https://api.cloudinary.com/v1_1/dcjvtqmkw/image/upload";
      setuploaded(true)
      let data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dcjvtqmkw");

      fetch(FETCH_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setformData({ ...formData, profilePic: data.url });
          setuploaded(false)
        })
        .catch((err) => {
          setuploaded(false)
          toast({
            title: "Image Upload Failed",
            status: "warning",
            duration: 1900,
            isClosable: true,
          });
        });
    }
  };

  const submitFormHandler =  () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPass
    ) {
      toast({
        title: "Form Validation Error",
        description: "Please Fill All the Form",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
      return;
    }

    if (formData.password !== formData.confirmPass) {
      toast({
        title: "Form Validation Error",
        description: "Password And Confirm Password Is Not Same",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
      return;
    }

      dispatch(signup(formData));
        toast({
          title: "Registration Successfully",
          status: "success",
          duration: 1900,
          isClosable: true,
        });

      setformData({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        image: "",
      });
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          name="name"
          p={5}
          autoComplete="off"
          value={formData.name}
          onChange={inputHandler}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          name="email"
          p={5}
          autoComplete="off"
          value={formData.email}
          onChange={inputHandler}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            p={5}
            value={formData.password}
            autoComplete="off"
            onChange={inputHandler}
          />
          <InputRightElement w="4.5rem">
            <Button size="sm" h="1.75rem" onClick={showPassHandler} bg="white">
              {showPass ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConPass ? "text" : "password"}
            name="confirmPass"
            placeholder="Enter Confirm Password"
            p={5}
            value={formData.confirmPass}
            autoComplete="off"
            onChange={inputHandler}
          />
          <InputRightElement w="4.5rem">
            <Button
              size="sm"
              h="1.75rem"
              onClick={showConPassHandler}
              bg="white"
            >
              {showConPass ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <Input
          type="file"
          p={1.5}
          accept="images/*"
          onChange={(e) => setimage(e.target.files[0])}
        />
      </FormControl>

      <Button
        w="100%"
        style={{ marginTop: "2rem" }}
        colorScheme="blue"
        onClick={submitFormHandler}
        isLoading={uploaded ? uploaded : Loading ? Loading : ""}

      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;

