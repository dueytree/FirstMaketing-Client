import RecruitNewForm from "components/RecruitNewForm";
import { Card } from "antd";
import React from "react";
import "./RecruitNew.scss";

export default function RecruitNew() {
  return (
    <div className="PostNew">
      <Card title="새 작업">
        <RecruitNewForm />
      </Card>
    </div>
  );
}
