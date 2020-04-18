import React, { useState } from "react";
import { Card, Form, Button, Typography, Input, Divider } from "antd";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";
import { withRouter } from "react-router-dom";

const { Title } = Typography;

function AddPoll(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = ({ optionOne, optionTwo }) => {
    setLoading(true);
    const { authUser, handleSaveQuestion } = props;
    handleSaveQuestion(optionOne, optionTwo, authUser).then(() => {
      setLoading(false);
      props.history.push("/");
    });
  };

  return (
    <Card title="Create a New Poll">
      <Title
        level={4}
        style={{
          marginBottom: "24px",
          fontWeight: 500,
        }}
      >
        Would You Rather...
      </Title>

      <Form form={form} name="login-form" onFinish={onFinish}>
        <Form.Item
          name="optionOne"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter Option One..." />
        </Form.Item>

        <Divider>OR</Divider>

        <Form.Item
          name="optionTwo"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input placeholder="Enter Option Two..." />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button loading={loading} htmlType="submit" style={{ marginTop: 10 }}>
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

const AddPollComponent = connect(mapStateToProps, { handleSaveQuestion })(
  AddPoll
);

export default withRouter(AddPollComponent);
