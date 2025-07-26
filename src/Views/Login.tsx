import { Flex, Button, HStack } from "@chakra-ui/react";
import { RiGoogleLine } from "react-icons/ri";
import LoginApi from "../apis/LoginApi";
import { Toaster, toaster } from "../components/ui/toaster";

const Login = () => {
  const handleLogin = () => {
    LoginApi.login()
      .then(({ data }) => {
        localStorage.setItem("session", data.session);
        window.location.replace(data.redirect_uri);
      })
      .catch((error) => {
        toaster.create({
          type: "error",
          title: "Login failed",
          description: error.response?.data?.message || "An error occurred",
          duration: 5000,
        });
      });
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
          <Button colorPalette="teal.50" variant="subtle" onClick={handleLogin}>
            <RiGoogleLine /> Login with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
