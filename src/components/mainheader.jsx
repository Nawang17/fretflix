import { useState, useEffect } from "react";
import { Button, Flex, Image, Text } from "@mantine/core";
import { IconBrandYoutubeFilled, IconPlaylist } from "@tabler/icons-react";
import { NavLink } from "react-router";

export const Mainheader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 460);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 460);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Flex align={"center"} px={10} pt={20} pb={10} justify={"space-between"}>
      {/* Logo & Name */}
      <NavLink
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        to={`/`}
      >
        <Flex align={"center"} gap={8}>
          <Image
            h={45}
            src="https://res.cloudinary.com/dwzjfylgh/image/upload/v1739945215/guitar-icon_qmiy2k.gif"
          />
          <Text fw="bold" size="1.2rem">
            FretFlix
          </Text>
        </Flex>
      </NavLink>

      {/* Buttons */}

      <Flex gap={2} justify={"space-between"} align={"center"}>
        <NavLink to={`/`}>
          <Button
            leftSection={<IconPlaylist size={20} />}
            variant="subtle"
            size="md"
            color="gray"
            style={{ color: "black" }}
          >
            Tabs
          </Button>
        </NavLink>

        <Button
          leftSection={<IconBrandYoutubeFilled color="red" size={22} />}
          onClick={() =>
            window.open("https://www.youtube.com/@nsherpaaa", "_blank")
          }
          variant="subtle"
          size="md"
          color="gray"
          style={{ color: "black" }}
        >
          {!isMobile ? "Watch my covers" : "YouTube"}
        </Button>
      </Flex>
    </Flex>
  );
};
