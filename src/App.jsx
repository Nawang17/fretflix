import "@mantine/core/styles.css";
import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  Card,
  Group,
} from "@mantine/core";
import { useState } from "react";
import {
  IconBrandYoutube,
  IconPlaylist,
  IconSearch,
} from "@tabler/icons-react";
import { Mainheader } from "./components/mainheader";
import { tabsData } from "./data";
import { NavLink } from "react-router";

export default function App() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tabs based on search input (matches title or artist)
  const filteredTabs = tabsData.filter((tab) =>
    `${tab.title} ${tab.artist}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      size="md"
      style={{ padding: 0, height: "100vh", overflow: "hidden" }}
    >
      {/* 🔹 Sticky Header Section */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "white",
        }}
      >
        <Mainheader />

        {/* 🔹 Sticky Search Bar */}
        <Flex
          style={{
            position: "sticky",
            top: "70px",
            zIndex: 999,
            background: "white",
            paddingBottom: 10,
          }}
        >
          <Input
            style={{ width: "100%", margin: "10px 20px" }}
            radius="md"
            placeholder="Search songs, artists"
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Flex>
      </div>

      {/* 🔹 Scrollable Tab List */}
      <div
        style={{
          height: "calc(100vh - 140px)", // Adjusted to fit remaining space
          overflowY: "scroll", // Enables scrolling
          padding: "10px 20px",
          scrollbarWidth: "none", // Hides scrollbar in Firefox
          msOverflowStyle: "none", // Hides scrollbar in IE & Edge
        }}
      >
        {/* 🔹 Check if there are matching tabs */}
        {filteredTabs.length > 0 ? (
          filteredTabs.map((tab, index) => (
            <Card
              key={index}
              shadow="md"
              padding="lg"
              radius="md"
              withBorder
              mb="md"
              style={{ transition: "0.2s", cursor: "pointer" }}
            >
              {/* 🔹 Song Title & Artist */}
              <Group position="apart">
                <Flex direction="column">
                  <Text fw="bold" size="lg">
                    {tab.title}
                  </Text>
                  <Text size="sm" color="dimmed">
                    {tab.artist}
                  </Text>
                </Flex>
              </Group>

              {/* 🔹 Action Buttons */}
              <Flex mt="md" gap={10}>
                {/* Button to watch YouTube cover */}
                <Button
                  leftSection={<IconBrandYoutube size={14} />}
                  color="orange"
                  variant="light"
                  onClick={() => window.open(tab.youtube, "_blank")}
                >
                  Watch Cover
                </Button>

                {/* Button to view tab */}
                <NavLink
                  to={`/tab/${tab.title}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="light"
                    leftSection={<IconPlaylist size={14} />}
                    style={{ backgroundColor: "#6C93D1", color: "white" }}
                  >
                    View Tab
                  </Button>
                </NavLink>
              </Flex>
            </Card>
          ))
        ) : (
          // 🔹 Show message if no tabs match search
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No matching tabs found.
          </Text>
        )}
      </div>
    </Container>
  );
}
