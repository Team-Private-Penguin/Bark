import React, { useState } from "react";
import { Textarea, Button, Group, Stack } from "@mantine/core";
import axios from "axios";

function AddComment({ setComments, event, user_id }) {
  const { event_id } = event;
  const [comment, setComment] = useState("");
  function handleClick() {
    let submission = { comment, user_id, event_id };
    axios
      .post(`/api/event/comment`, submission)
      .then(() => axios.get(`/api/event/comment?id=${event_id}`))
      .then((data) => {
        setComments(data.data[0].rows);
        setComment("");
      })
      .catch((err) => console.log(err));
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
        <Button
          className="bg-slate-800"
          size="md"
          disabled={!comment.length}
          onClick={handleClick}
        >
          Post
        </Button>
      </Stack>
    </Group>
  );
}

export default AddComment;
