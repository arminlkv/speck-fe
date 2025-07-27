import { Flex, Button, HStack } from "@chakra-ui/react";
import { RiGoogleLine } from "react-icons/ri";
import { Toaster, toaster } from "../components/ui/toaster";
import { handleLogin } from "../utils/helpers";

const Login = () => {
  const onLoginClick = () => {
    handleLogin(toaster);
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg={"gray.100"}>
      <Toaster />
      <Flex
        flexDirection="column"
        bg="teal.500"
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <HStack>
          <Button
            colorPalette="teal.50"
            variant="subtle"
            onClick={onLoginClick}
          >
            <RiGoogleLine /> Login with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
