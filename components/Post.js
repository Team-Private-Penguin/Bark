import React, { useState } from "react";
import PostDetail from "./PostDetail";
import { Modal, Card, Text } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
const defaultPhoto2 =
  "https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80";

function Post() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-[550px]">
        <Card
          className="bg-transparent"
          radius="10px"
          shadow="sm"
          p="sm"
          onClick={() => setOpened(true)}
        >
          <Card.Section className="p-2">
            <h3 className="text-left font-bold color-accent">
              Group Name and Icon
            </h3>
          </Card.Section>
          <Card.Section className="flex justify-center items-center">
            <img className="rounded-[10px] max-h-[400px]" src={defaultPhoto2} />
          </Card.Section>
          <Card.Section className="p-2">
            <h3 className="text-left font-bold color-accent">
              Event Name TEMP
            </h3>
            <Text color="var(--light-blue)" align="left" size="sm">
              Date and Time TEMP
            </Text>
            <Text color="var(--black)" align="left">
              Event Location
            </Text>
          </Card.Section>
        </Card>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        transition="fade"
        transitionDuration={300}
        transitionTimingFunction="ease"
        size="65%"
        overflow="outside"
      >
        <PostDetail />
      </Modal>
    </div>
  );
}

export default Post;

//style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
