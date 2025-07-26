import React from "react";
import { Flex, Button, HStack } from "@chakra-ui/react";
import { RiGoogleLine } from "react-icons/ri";

const Login = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg={"gray.100"}>
      <Flex
        flexDirection="column"
        bg="teal.500"
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <HStack>
          <Button colorPalette="teal.50" variant="subtle">
            <RiGoogleLine /> Login with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
