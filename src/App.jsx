import "@mantine/core/styles.css";

import {
  Button,
  Container,
  Flex,
  Image,
  MantineProvider,
  Text,
} from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      <Container
        style={{
          border: "2px solid green",
          padding: 0,
        }}
        size="lg"
      >
        <Flex align={"center"} px={10} py={10} justify={"space-between"}>
          <Flex align={"center"} gap={8}>
            <Image h={45} src="../public/guitar-icon.gif" />
            <Text fw="bold" size="1.2rem">
              FretFlix
            </Text>
          </Flex>
          <Flex gap={30} justify={"space-between"} align={"center"}>
            <Button variant="transparent">All tabs</Button>
            <Button variant="transparent">My YouTube</Button>
            <Button variant="transparent">Dark mode</Button>
          </Flex>
        </Flex>
      </Container>
    </MantineProvider>
  );
}
