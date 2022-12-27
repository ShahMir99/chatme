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
import { clearError, login } from "../../Action/authAction";
import { useEffect } from "react";

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [showPass, setshowPass] = useState(false);
  const {error , Loading} = useSelector((state) => state.auth)
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setformData((preval) => {
      return { ...preval, [name]: value };
    });
  };

  const showPassHandler = () => {
    setshowPass((preval) => !preval);
  };

  const submitFormHandler = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Form Validation Error",
        description: "Please Fill All the Form",
        status: "warning",
        duration: 1900,
        isClosable: true,
      });
      return;
    }
    dispatch(login(formData));
    setformData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    {error && toast({
      title: "Authentication Failed",
      description: error.response ? error.response.data : error ? error.message :" ",
      status: "warning",
      duration: 1900,
      isClosable: true,
    });
    dispatch(clearError())
  }
  },[error]);


  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          name="email"
          p={5}
          value={formData.email}
          autoComplete="off"
          onChange={inputHandler}
          autoFocus
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
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

      <Button
        w="100%"
        style={{ marginTop: "2rem" }}
        colorScheme="blue"
        onClick={submitFormHandler}
        isLoading={Loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
