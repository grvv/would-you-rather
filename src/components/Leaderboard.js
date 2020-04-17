import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Typography, Divider, Avatar } from "antd";

const { Title } = Typography;

function Leaderboard({ leaderboardData }) {
  return (
    <>
      {leaderboardData.map((user) => (
        <Card
          key={user.id}
          hoverable
          style={{ width: "100%", marginBottom: 20 }}
        >
          <Row>
            <Col span={6}>
              <Avatar size={80} src={user.avatarURL} />
            </Col>

            <Col span={1}>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>

            <Col span={10}>
              <Title level={4}>{user.name}</Title>

              <Row justify="space-between">
                <Col>Answered questions</Col>
                <Col>{user.answerCount}</Col>
              </Row>

              <Row justify="space-between">
                <Col>Created questions</Col>
                <Col>{user.questionCount}</Col>
              </Row>
            </Col>

            <Col span={1}>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>

            <Col span={6}>
              <Title level={4}>Score</Title>
              <Title level={4} type="secondary">
                {user.questionCount + user.answerCount}
              </Title>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
