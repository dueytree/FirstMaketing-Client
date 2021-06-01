import React from "react";
import { Input, Menu } from "antd";
import "FirstApp.scss";
import Logo from "assets/logo.png";

function FirstApp({ children }) {
  return (
    <div className="app">
      <div className="header">
        <h2 className="page-title">
          <img src={Logo} alt="logo" />
          FirstMaketing
        </h2>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>진행중</Menu.Item>
            <Menu.Item>페이백 대기</Menu.Item>
            <Menu.Item>마이페이지</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2020~2021. First Maketing.</div>
    </div>
  );
}

export default FirstApp;
