import React from "react";
import { Layout, Row, Col } from "antd";

import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import AddPoll from "../components/AddPoll";
import AnswerQuestionCard from "../components/AnswerQuestionCard";
import NotFound from "../components/NotFound";
import Navbar from "../components/Navbar";

const { Header, Content } = Layout;

function DashboardView() {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header className="header-styling">
        <Navbar />
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

export default DashboardView;
