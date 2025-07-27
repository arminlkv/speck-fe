import { Flex, Button, HStack } from "@chakra-ui/react";
import { RiGoogleLine } from "react-icons/ri";
import { Toaster, toaster } from "../components/ui/toaster";
import { handleLogin } from "../utils/helpers";

const Login = () => {
  const onLoginClick = () => {
    handleLogin(toaster);
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)"
      p={4}
    >
      <Toaster />

      <Flex
        flexDirection="column"
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(10px)"
        p={12}
        borderRadius={12}
        boxShadow="2xl"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <HStack>
          <Button
            colorScheme="whiteAlpha"
            variant="solid"
            bg="whiteAlpha.800"
            _hover={{ bg: "whiteAlpha.900" }}
            color="gray.800"
            onClick={onLoginClick}
          >
            <RiGoogleLine />
            Login with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
