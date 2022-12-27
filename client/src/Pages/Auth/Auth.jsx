import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Register from "../../Components/AuthComponents/Register";
import Login from "../../Components/AuthComponents/Login";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="3rem 0 20px 0"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="0 1px 5px #00000035"
      >
        <Text fontSize="2xl" textAlign="center" color={"black"}>
          Chat Application
        </Text>
      </Box>

      <Box
        w="100%"
        bg={"white"}
        p={3}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="0 2px 5px #00000035"
      >
        <Tabs variant="soft-rounded">
          <TabList justifyContent="center" mb="1em" >
            <Tab w="50%" >Login</Tab>
            <Tab w="50%">Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
