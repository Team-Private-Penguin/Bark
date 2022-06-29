import { Stack } from "@mantine/core";
import React from "react";
import Comment from "./Comment";

function CommentFeed({ comments }) {
  return (
    <Stack>
      {comments.map((commentObj, index) => (
        <Comment key={index} commentObj={commentObj} />
      ))}
    </Stack>
  );
}

export default CommentFeed;
