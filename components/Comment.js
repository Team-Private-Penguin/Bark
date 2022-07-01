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
      <Card.Section className="bg-red text-white p-2">
        <Group position="apart">
          <Group className="ml-2">
            <Avatar src={photo} radius="xl" component="span" size={30} />
            <Text className="font-semibold" align="left">
              {name}
            </Text>
          </Group>
          <Text className="text-white mr-2">
            {timeStamp.toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </Text>
          {isOwner ? (
            <Button color="red" onClick={handleDeleteComment}>
              Delete
            </Button>
          ) : null}
        </Group>
      </Card.Section>
      <Card.Section p="1rem">{comment}</Card.Section>
    </Card>
  );
}

export default Comment;
