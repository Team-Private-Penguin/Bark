import React from "react";
import Comment from "./Comment";

function CommentFeed() {
  return (
    <div className="space-y-10">
      {/* .map of Comment array */}
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default CommentFeed;
