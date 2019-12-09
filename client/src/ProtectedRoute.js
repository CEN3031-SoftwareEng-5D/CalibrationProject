import React, { Component }  from 'react';
import { Route, Switch, Redirect, withRouter  } from 'react-router-dom';
import './bootstrap/dist/css/bootstrap.min.css';
import authenticated from "./authenticated"

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route
        {...props}
        render={props => (
          authenticated.isAuthenticated() ?
            <Component {...props} /> :
            <Redirect to='/Home' />
        )}
      />
    )
  }
}

export default ProtectedRoute;
