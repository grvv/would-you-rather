import React from "react";
import {
  HomeOutlined,
  BulbOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { withRouter } from "react-router-dom";
import { setAuthUser } from "../actions/authUser";
import { connect } from "react-redux";

function Navbar(props) {
  const { location, user } = props;
  const { pathname } = location;

  const [currentlySelected, setCurrentlySelected] = useState(
    pathname === "/" ? "home" : pathname
  );

  const handleLogout = () => {
    props.setAuthUser(null);
    props.history.push("/");
  };

  const handleClick = (e) => {
    setCurrentlySelected(e.key);

    if (e.key === "home") {
      return props.history.push("/");
    }

    props.history.push(`/${e.key}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div>
        <Menu
          onClick={handleClick}
          selectedKeys={currentlySelected}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <HomeOutlined />
            Home
          </Menu.Item>
          <Menu.Item key="add">
            <BulbOutlined />
            New Poll
          </Menu.Item>
          <Menu.Item key="leaderboard">
            <LineChartOutlined />
            Leader Board
          </Menu.Item>
        </Menu>
      </div>

      <Dropdown overlay={menu}>
        <div className="flex-avatar-center">
          <Avatar src={user.avatarURL} style={{ marginRight: 16 }} />
          <span>{user.name}</span>
        </div>
      </Dropdown>
    </>
  );
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

const navbarComponent = connect(mapStateToProps, { setAuthUser })(Navbar);

export default withRouter(navbarComponent);
