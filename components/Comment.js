import React from "react";
import { Group, Text, Card, Avatar, Badge, Button } from "@mantine/core";
import axios from "axios";

function Comment({ commentObj, isOwner, getComments }) {
  const { comment, date, name, photo, comment_id } = commentObj;
  const timeStamp = new Date(date);
  function handleDeleteComment() {
    axios({
      method: "DELETE",
      url: "/api/event/comment",
      data: {
        comment_id,
      },
    })
      .then(() => getComments())
      .catch((err) => console.log(err));
  }

  return (
    <Card className="border rounded-xl">
      <Card.Section className="bg-main" p=".5rem">
        <Group position="apart">
          <Group>
            <Avatar src={photo} radius="xl" component="span" size={30} />
            <Text className="" color="var(--black)" align="left">
              {name}
            </Text>
          </Group>
          <Badge color="gray" variant="light">
            {timeStamp.toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </Badge>
          {isOwner ? (
            <Button color="red" onClick={handleDeleteComment}>
              Delete Comment
            </Button>
          ) : null}
        </Group>
      </Card.Section>
      <Card.Section p=".5rem">{comment}</Card.Section>
    </Card>
  );
}

export default Comment;
