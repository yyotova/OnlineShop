import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LoginActions } from '../../models/user-types';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../models/shared-types';

export default function PrivateRoute({ component, ...rest }: RouteProps) {
  const Component = component!;
  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );

  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => (userInfo ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      ))}
    />
  );
}
