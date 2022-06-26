import React, { useState } from "react";
import PostDetail from "./PostDetail";
import { Modal, Card, Image, Text } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function Post() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="flex-grow max-w-[400px]">
        <Card
          className="bg-transparent"
          radius="10px"
          shadow="sm"
          p="xs"
          onClick={() => setOpened(true)}
        >
          <Card.Section className="p-2">
            <h3 className="text-left font-bold color-accent">
              Group Name and Icon
            </h3>
          </Card.Section>
          <Card.Section>
            <div className="max-h-[300px]">
              <Image radius="10px" fit="contain" src={defaultPhoto} />
            </div>
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
