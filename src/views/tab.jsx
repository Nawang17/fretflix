import { NavLink, useParams } from "react-router";
import { Container, Flex, Button, Text, ActionIcon } from "@mantine/core";
import { Mainheader } from "../components/mainheader";
import { tabsData } from "../data";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Tab() {
  const { tabname } = useParams(); // Get tab name from URL

  // 🔹 Find the tab data based on the URL parameter
  const tab = tabsData.find((t) => `${t.title}` === tabname);

  // 🔹 If tab is not found, show an error message
  if (!tab) {
    return (
      <Container
        size="md"
        style={{ padding: 0, height: "100vh", overflow: "hidden" }}
      >
        <Mainheader />
        <Text align="center" mt={20} fw="bold" color="red">
          Tab Not Found
        </Text>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Button fullWidth mt={20}>
            Back to Home
          </Button>
        </NavLink>
      </Container>
    );
  }

  return (
    <Container size="md" style={{ padding: 0 }}>
      <Mainheader />

      {/* 🔹 Back Button */}
      <NavLink to="/" style={{ margin: "20px 20px", textDecoration: "none" }}>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          aria-label="back-button"
        >
          <IconArrowLeft />
        </ActionIcon>
      </NavLink>

      {/* 🔹 Song Details */}
      <Flex style={{ margin: "10px 20px" }} direction="column" mt={20} gap={10}>
        <Text size="2rem">
          {tab.title} by <strong>{tab.artist}</strong>
        </Text>
        <Text mt={5}>Capo: {tab.capo}</Text>

        {/* 🔹 YouTube Video Link */}
        <Text mt={5}>
          Watch the cover:{" "}
          <a
            href={tab.youtube}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Click here to watch on YouTube
          </a>
        </Text>
        <Text size="sm" c="dimmed">
          This tab is wide. Please scroll horizontally to view the full tab.
        </Text>
      </Flex>

      {/* 🔹 Guitar Tab Display */}
      <pre
        style={{
          fontFamily: "monospace",
          background: "#1e1e1e",
          color: "#f8f8f2",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
          whiteSpace: "pre",
          margin: "10px 20px",
          marginBottom: 40,
        }}
      >
        {tab.frets}
      </pre>
    </Container>
  );
}
