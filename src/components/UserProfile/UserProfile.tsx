import { HStack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import Cookies from "js-cookie";

const GoogleProfile = () => {
  const userStr = Cookies.get("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) return null;

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("session");
    window.location.href = "/";
  };

  return (
    <Menu>
      <HStack as={MenuButton} cursor="pointer" ml="auto" pr={4}>
        <Avatar
          src={user.picture}
          name={user.name}
          borderRadius="50%"
          width={35}
          height={35}
          ml={10}
        />
      </HStack>
      <MenuList
        backdropBlur={"sm"}
        borderRadius="md"
        boxShadow="md"
        background={"white"}
        borderBottomRadius={8}
      >
        <MenuItem
          onClick={handleLogout}
          color={"black"}
          cursor={"pointer"}
          _hover={{ bg: "gray" }}
          transition={"background 0.2s ease"}
          padding={13}
          borderBottomRadius={8}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default GoogleProfile;
