import "@mantine/core/styles.css";
import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  Card,
  Group,
  Skeleton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconBrandYoutube,
  IconPlaylist,
  IconSearch,
} from "@tabler/icons-react";
import { Mainheader } from "./components/mainheader";
import { NavLink } from "react-router";
import { fetchTabs } from "./apiCalls/fetchtabsdata";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabsData, setTabsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabs().then((data) => {
      setTabsData(data);
      setLoading(false);
    });
  }, []);

  // Filter tabs based on search input
  const filteredTabs = tabsData
    .filter((tab) =>
      `${tab.title} ${tab.artist}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.ytcoverdate) - new Date(a.ytcoverdate)); // Sort by date descending

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
        {/* 🔹 Show Skeletons when loading */}
        {loading ? (
          <>
            {new Array(2).fill(0).map((_, index) => (
              <Container mx={0} px={0} mb={40} key={index}>
                <Skeleton height={5} width="75px" radius="xl" />
                <Skeleton height={5} mt={10} width="60px" radius="xl" />

                <Flex mt={10} gap={10}>
                  <Skeleton height={25} mt={5} width="110px" radius="sm" />
                  <Skeleton height={25} mt={5} width="110px" radius="sm" />
                </Flex>
              </Container>
            ))}
          </>
        ) : filteredTabs.length > 0 ? (
          // 🔹 Show Tabs when loading is finished and there are results
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
          // 🔹 Show "No matching tabs found" only when loading is finished and no results
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No matching tabs found.
          </Text>
        )}
      </div>
    </Container>
  );
}
