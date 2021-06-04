import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import useAxios from "axios-hooks";
import Recruit from "./Recruit";
import { useAppContext } from "store";
import Axios from "axios";

function RecruitList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: recruitList, loading, error }, refetch] = useAxios({
    url: "http://127.0.0.1:8000/api/recruit/",
    headers,
  });

  return (
    <div>
      {recruitList && recruitList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {recruitList &&
        recruitList.map((recruit) => (
          <Recruit recruit={recruit} key={recruit.id} />
        ))}
    </div>
  );
}
export default RecruitList;
