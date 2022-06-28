import { Stack } from "@mantine/core";
import React from "react";
import Comment from "./Comment";

function CommentFeed() {
  return (
    <Stack>
      {/* .map of Comment array */}
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Stack>
  );
}

export default CommentFeed;
