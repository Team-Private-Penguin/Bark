import React, { useState } from "react";
import { Textarea, Button, Group, Stack } from "@mantine/core";

function AddComment() {
  const [comment, setComment] = useState("");
  function handleClick() {
    //Post Comment
  }
  return (
    <Group p=".5rem">
      <Stack style={{ flexGrow: 1 }}>
        <Textarea
          autosize
          radius="lg"
          placeholder="Add a comment..."
          minRows={2}
          maxRows={5}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
      </Stack>
      <Stack>
        <Button size="md" disabled={!comment.length} onClick={handleClick}>
          Post
        </Button>
      </Stack>
    </Group>
  );
}

export default AddComment;
