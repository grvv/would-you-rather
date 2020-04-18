import React from "react";
import { Layout, Menu, Dropdown, Avatar, Row, Col } from "antd";

import {
  HomeOutlined,
  BulbOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Home from "../components/Home";
import { withRouter, Switch, Route } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";
import AddPoll from "../components/AddPoll";
import AnswerQuestionCard from "../components/AnswerQuestionCard";
import NotFound from "../components/NotFound";

const { Header, Content } = Layout;

function DashboardView(props) {
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
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header className="header-styling">
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
      </Header>
      <Content style={{ padding: "20px 50px", marginTop: 64 }}>
        <Row justify="space-around" align="middle">
          <Col xs={24} sm={24} md={16} lg={12} xl={10}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={AddPoll} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route
                exact
                path="/questions/:question_id"
                component={AnswerQuestionCard}
              />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

const dashboard = connect(mapStateToProps, { setAuthUser })(DashboardView);

export default withRouter(dashboard);
