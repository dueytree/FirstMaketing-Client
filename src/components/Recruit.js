import React from "react";
import { Card } from "antd";

import "./Recruit.scss";
import CommentList from "./CommentList";

function Recruit({ recruit }) {
  const { author, product, photo, location, platform, celler } = recruit;
  const { username } = author; // TODO: 추후 수정

  return (
    <div className="recruit">
      <Card hoverable cover={<img src={photo} alt={product} />}>
        <Card.Meta
          title={product}
          description={platform}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList recruit={recruit} />
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location} */}
    </div>
  );
}

export default Recruit;
