import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginView from "./views/LoginView";

import { handleInitialData } from "./actions/shared";
import DashboardView from "./views/DashboardView";
import { connect } from "react-redux";

function App(props) {
  const { authUser, handleInitialData } = props;

  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

  return (
    <Router>
      <div className="App">
        {authUser === null ? (
          <Route render={() => <LoginView />} />
        ) : (
          <DashboardView />
        )}
      </div>
    </Router>
  );
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
