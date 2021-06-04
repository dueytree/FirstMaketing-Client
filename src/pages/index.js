import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AccountsRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import RecruitNew from "./RecruitNew";

function Root() {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/recruit/new" component={RecruitNew} />
      <Route path="/accounts" component={AccountsRoutes} />
    </>
  );
}

export default Root;
