import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') ? true : false;// determine if the user is authenticated or not

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
