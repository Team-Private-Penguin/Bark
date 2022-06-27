import React, { useState } from "react";
import { Textarea, Button } from "@mantine/core";

function AddComment() {
  const [comment, setComment] = useState("");
  function handleClick() {
    //Post Comment
  }
  return (
    <div>
      <Textarea
        variant="filled"
        autosize
        radius="lg"
        placeholder="Add a comment..."
        minRows={2}
        maxRows={5}
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <Button disabled={!comment.length} onClick={handleClick}>
        Post Comment
      </Button>
    </div>
  );
}

export default AddComment;
