import React, { useState } from "react";
import { Textarea, Card, Image, Text, Button, Group } from "@mantine/core";

const defaultPhoto =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

function PostDetail() {
  const [comment, setComment] = useState("");
  function handleClick() {
    //Post Comment
  }
  return (
    <div>
      <Card className="space-y-1" radius="10px" shadow="sm">
        <Card.Section className="bg-main p-2">
          <h3 className="text-left font-bold color-accent">
            Group Name and Icon
          </h3>
        </Card.Section>
        <Card.Section className="flex items-center justify-top">
          <div className="w-[35%] flex-column space-y-4 mb-10">
            <h3 className="text-center font-bold color-accent">
              Event Name TEMP
            </h3>
            <Text color="var(--light-blue)" align="center" size="sm">
              Date and Time TEMP
            </Text>
            <Text color="var(--black)" align="center">
              Event Location TEMP
            </Text>
          </div>
          <div className="w-[65%]">
            <Image radius="10px" fit="contain" src={defaultPhoto} />
          </div>
        </Card.Section>
        <Card.Section className="bg-main p-2">
          <Text color="var(--black)" align="left" p=".5rem">
            Event Description
          </Text>
        </Card.Section>
        <Card.Section className="p-2 bg-main space-y-1">
          <Textarea
            variant="filled"
            autosize
            radius="lg"
            placeholder="Add a comment..."
            minRows={2}
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />

          <Button
            variant="white"
            className="text-black w-24"
            onClick={handleClick}
          >
            Post
          </Button>
        </Card.Section>
        <Card.Section className="p-2 bg-main">
          <Group className="bg-main" p=".5rem">
            <icon>UserIcon</icon>
            <Text className="bg-main" color="var(--black)" align="left">
              UserName
            </Text>
            <Text className="bg-main" color="var(--black)" align="left">
              Date and Time
            </Text>
          </Group>
          <Text className="bg-white p-2" color="var(--black)" align="left">
            Comment
          </Text>
        </Card.Section>
      </Card>
    </div>
  );
}

export default PostDetail;
