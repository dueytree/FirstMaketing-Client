import React from "react";
import { Button } from "antd";
import RecruitList from "components/RecruitList";
import FirstApp from "components/FirstApp";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/recruit/new");
  };
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "1rem" }}
        onClick={handleClick}
      >
        새 작업
      </Button>
    </>
  );
  return (
    <FirstApp sidebar={sidebar}>
      <RecruitList />
    </FirstApp>
  );
}

export default Home;
