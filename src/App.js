import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/layout";
import Logout from "./pages/logout";
import Login from "./pages/login/Login";
import Home from "./pages/home";
import * as actions from "./redux/actions/index";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute
          path="/"
          exact
          component={Home}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
        />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
