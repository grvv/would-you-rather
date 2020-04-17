import React from "react";
import { Row, Col, Card, Form, Button, Select, Avatar, Typography } from "antd";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

const { Option } = Select;
const { Title, Text } = Typography;

function LoginView(props) {
  const [form] = Form.useForm();

  const onFinish = ({ user }) => {
    props.setAuthUser(user);
  };

  return (
    <Row justify="space-around" align="middle">
      <Col xs={22} sm={22} md={16} lg={12} xl={10} className="margin-top-2x">
        <Card>
          <Title level={4} className="m-0 text-center">
            Welcome to Would You Rather App
          </Title>
          <div className="margin-bottom-x text-center">
            <Text type="secondary">Please Log In to continue</Text>
          </div>

          <div className="margin-bottom-2x text-center">
            <img src="/images/login-page.svg" alt="" width="80%" />
          </div>

          <Form form={form} name="login-form" onFinish={onFinish}>
            <Form.Item
              name="user"
              rules={[{ required: true, message: "Please select a user" }]}
            >
              <Select placeholder="Select User" allowClear size="large">
                {props.users.map(({ avatarURL, name, id }, index) => (
                  <Option value={id} key={index.toString()}>
                    <Avatar src={avatarURL} />
                    <span style={{ marginLeft: 20 }}>{name}</span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button block htmlType="submit" style={{ marginTop: 10 }}>
              Login
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

const Login = connect(mapStateToProps, { setAuthUser })(LoginView);

export default Login;
