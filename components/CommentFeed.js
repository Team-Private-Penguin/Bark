import React from "react";
import Comment from "./Comment";

function CommentFeed() {
  return (
    <div>
      {/* .map of Comment array */}
      <Comment />
      <Comment />
    </div>
  );
}

export default CommentFeed;
