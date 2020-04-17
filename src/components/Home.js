import React from "react";

import { Row, Tabs } from "antd";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const { TabPane } = Tabs;

function Home(props) {
  const { answered, unanswered } = props;

  return (
    <Tabs type="card">
      <TabPane tab="Un-Answered " key="1">
        <Row style={{ padding: "8px" }}>
          {unanswered.map((question) => (
            <QuestionCard {...question} key={question.id} type="unAnswered" />
          ))}
        </Row>
      </TabPane>
      <TabPane tab="Answered" key="2">
        <Row style={{ padding: "8px" }}>
          {answered.map((question) => (
            <QuestionCard {...question} key={question.id} type="answered" />
          ))}
        </Row>
      </TabPane>
    </Tabs>
  );
}

function mapStateToProps({ authUser, users, questions }) {
  const answered = [];
  const unanswered = [];
  const answeredIds = Object.keys(users[authUser].answers);

  Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((question) => {
      const tempQuestion = { ...question };
      tempQuestion.authorDetails = { ...users[question.author] };

      if (answeredIds.includes(question.id)) {
        answered.push(tempQuestion);
      } else {
        unanswered.push(tempQuestion);
      }
    });

  return {
    answered,
    unanswered,
  };
}

export default connect(mapStateToProps)(Home);
