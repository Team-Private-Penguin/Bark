import React, { useState } from "react";
import { Textarea, Button, Group, Stack } from "@mantine/core";
import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <Group className="ml-2 mr-2 p-2">
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
      <Stack className="w-[3vw] p-2 border text-teal hover:text-red hover:border-red border-[lightgrey] rounded-full transition duration-200 ease-in-out">
        <FontAwesomeIcon
          className="text-lg  cursor-pointer p-1"
          icon={faPaperPlane}
          onClick={handleClick}
        />
      </Stack>
    </Group>
  );
}

export default AddComment;
