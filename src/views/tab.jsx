import { NavLink, useParams } from "react-router";
import {
  Container,
  Flex,
  Button,
  Text,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { Mainheader } from "../components/mainheader";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fetchTabByTitle } from "../apiCalls/fetchtabsdata";
import { logEvent } from "firebase/analytics";
import { useAnalytics } from "../firebaseconfig";
export default function Tab() {
  const { tabname } = useParams(); // Get tab name from URL
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  useEffect(() => {
    if (useAnalytics) {
      logEvent(useAnalytics, "view_tab", { tabname }); // ✅ Log event for viewing tab with tabname
    } else {
      console.error("❌ Firebase Analytics is NOT initialized!");
    }
    fetchTabByTitle(tabname).then((tab) => {
      setTab(tab);
      setLoading(false); // ✅ Stop loading after fetching
    });
  }, [tabname]); // ✅ Add tabname as a dependency to refetch if URL changes

  // 🔹 Show Loader while fetching data
  if (loading) {
    return (
      <Container
        size="md"
        style={{ padding: 0, height: "100vh", overflow: "hidden" }}
      >
        <Mainheader />
        <Flex align="center" justify="center" style={{ height: "100vh" }}>
          <Loader size="lg" />
        </Flex>
      </Container>
    );
  }

  // 🔹 If tab is not found after loading, show an error message
  if (!tab) {
    return (
      <Container
        size="md"
        style={{ padding: 0, height: "100vh", overflow: "hidden" }}
      >
        <Mainheader />
        <Flex
          align="center"
          justify="center"
          direction="column"
          style={{ height: "100vh" }}
        >
          <Text align="center" fw="bold" c="red">
            Tab Not Found
          </Text>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button mt={20}>Back to Home</Button>
          </NavLink>
        </Flex>
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
          Please scroll horizontally to view the full tab.
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
