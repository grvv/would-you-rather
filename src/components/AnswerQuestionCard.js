import React from "react";
import {
  Col,
  Divider,
  Card,
  Avatar,
  Typography,
  Row,
  Form,
  Radio,
  Progress,
  Tag,
} from "antd";
import { handleSaveQuestionAnswer } from "../actions/users";
import { connect } from "react-redux";
import NotFound from "./NotFound";

const { Title, Text } = Typography;

const RADIO_STYLE = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

function calculatePercentage(count, totalCount) {
  return ((count / totalCount) * 100).toFixed(2);
}

function AnswerQuestionCard(props) {
  const [form] = Form.useForm();
  const { handleSaveQuestionAnswer, authUser, match } = props;

  if (!props.question) return <NotFound text="Poll Not Found" />;

  const {
    authorDetails: author,
    optionOne,
    optionTwo,
    userAnswer,
  } = props.question;

  const { length: optionOneVotes } = optionOne.votes;
  const { length: optionTwoVotes } = optionTwo.votes;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const saveAnswer = () => {
    form
      .validateFields()
      .then((values) => {
        const { selectedOption } = values;
        const { question_id } = match.params;

        handleSaveQuestionAnswer(authUser, question_id, selectedOption);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Card
      title={`${author.name} asks:`}
      hoverable
      actions={
        !userAnswer && [
          <div onClick={saveAnswer}>
            <span style={{ marginLeft: 10 }}>Submit</span>
          </div>,
        ]
      }
      style={{ width: "100%", marginBottom: 20 }}
    >
      <Row>
        <Col span={6}>
          <Avatar size={80} src={author.avatarURL} />
        </Col>

        <Col span={2}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>

        <Col span={16}>
          {!userAnswer ? (
            <>
              <Title level={4}>Would you rather</Title>
              <Form form={form} name="login-form" onFinish={() => {}}>
                <Form.Item
                  name="selectedOption"
                  rules={[
                    {
                      required: true,
                      message: "Select atleast one Option.",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio style={RADIO_STYLE} value="optionOne">
                      {optionOne.text}
                    </Radio>
                    <Radio style={RADIO_STYLE} value="optionTwo">
                      {optionTwo.text}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </>
          ) : (
            <div>
              <Title level={4}>Results:</Title>
              <Title type="secondary" level={4} style={{ marginTop: 0 }}>
                Would You rather
              </Title>

              <div className="result-block">
                {userAnswer === "optionOne" && (
                  <div>
                    <Tag color="success">Your Answer</Tag>
                    <br />
                  </div>
                )}
                <Text type="secondary">{optionOne.text}</Text>
                <br />
                <Progress
                  status="normal"
                  style={{ marginBottom: 16 }}
                  percent={calculatePercentage(optionOneVotes, totalVotes)}
                />
                <br />
                <Text>{`${optionOneVotes} out of ${totalVotes} Votes`}</Text>
              </div>

              <div className="result-block">
                {userAnswer === "optionTwo" && (
                  <div>
                    <Tag color="success">Your Answer</Tag>
                    <br />
                  </div>
                )}
                <Text type="secondary">{optionTwo.text}</Text>
                <br />
                <Progress
                  status="normal"
                  percent={calculatePercentage(optionTwoVotes, totalVotes)}
                />
                <br />
                <Text>{`${optionTwoVotes} out of ${totalVotes} Votes`}</Text>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}

function mapStateToProps({ authUser, questions, users }, { match }) {
  const { question_id } = match.params;
  let question = questions[question_id];

  if (question) {
    question = { ...question };
    question.authorDetails = { ...users[question.author] };
    question.userAnswer = users[authUser].answers[question_id];
  }

  return {
    question,
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  AnswerQuestionCard
);
