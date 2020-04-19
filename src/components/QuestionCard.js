import React from "react";
import { Col, Divider, Card, Avatar, Typography, Row } from "antd";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Title, Text } = Typography;

function QuestionCard({ authorDetails: author, optionOne, type, history, id }) {
  const ACTION_OBJ = {
    unAnswered: [
      <div onClick={() => history.push(`/questions/${id}`)}>
        <EditOutlined />
        <span style={{ marginLeft: 10 }}>Answer Poll</span>
      </div>,
    ],
    answered: [
      <div onClick={() => history.push(`/questions/${id}`)}>
        <SolutionOutlined />
        <span style={{ marginLeft: 10 }}>Results</span>
      </div>,
    ],
  };

  return (
    <Card
      title={`${author.name} asks:`}
      hoverable
      actions={ACTION_OBJ[type]}
      style={{ width: "100%", marginBottom: 20 }}
    >
      <Row>
        <Col span={6} className="margin-right-x">
          <Avatar size={80} src={author.avatarURL} />
        </Col>

        <Col>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>

        <Col span={16} style={{ textAlign: "center" }}>
          <Title level={4}>Would you rather</Title>

          <Text type="secondary">{optionOne.text}</Text>
          <br />
          <Text type="secondary">or...</Text>
        </Col>
      </Row>
    </Card>
  );
}

export default withRouter(QuestionCard);
