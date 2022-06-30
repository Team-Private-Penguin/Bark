import { Stack } from "@mantine/core";
import React from "react";
import Comment from "./Comment";

function CommentFeed({ comments, isOwner, getComments }) {
  return (
    <Stack>
      {comments.map((commentObj, index) => (
        <Comment
          key={index}
          isOwner={isOwner}
          getComments={getComments}
          commentObj={commentObj}
        />
      ))}
    </Stack>
  );
}

export default CommentFeed;
