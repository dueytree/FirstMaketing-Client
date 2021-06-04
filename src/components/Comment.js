import React from "react";
import { Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";

export default function Comment({ comment }) {
  const {
    author: { username, name },
    message,
    created_at,
  } = comment;

  const displayName = name.length === 0 ? username : name;

  return (
    <AntdComment
      author={displayName}
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
