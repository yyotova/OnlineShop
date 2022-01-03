import React, { ReactElement, useEffect } from 'react';
import { Button, Box, SnackbarContent } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../actions/userActions';
import { ReduxState } from '../../models/shared-types';
import { Formik, Field, Form } from 'formik';
import { string, object } from 'yup';
import { LoginActions } from '../../models/user-types';
import useStyles from '../styles';

export default function Login(): ReactElement {
  const history = useHistory();
  const classes = useStyles();

  const userLogging: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const { userInfo, error } = userLogging;
  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/products';

  const handleClick = () => {
    window.location.reload(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClick}>
      Try Again!
    </Button>
  );

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={object({
        email: string().email().required(),
        password: string().required(),
      })}
      onSubmit={({ email, password }) => {
        dispatch(loginAction(email, password));
      }}
    >
      {({ handleChange }) => (
        <Box display="flex" justifyContent="center" margin="100px">
          <Form autoComplete="off">
            <Box display="flex" justifyContent="center" alignItems="center">
              <h1>Log In</h1>
            </Box>
            <div>
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="E-mail"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Password"
                onChange={handleChange}
              />
            </div>

            <Box display="flex" justifyContent="center" margin="25px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Log In
              </Button>
            </Box>
            <p>
              Don't have an account yet?{' '}
              <Link
                to="register"
                style={{ color: '#3686ad' }}
              >
                Register here
              </Link>
              .
            </p>
            {error !== undefined && (
              <SnackbarContent message="Invalid Credentials!" action={action} />
            )}
          </Form>
        </Box>
      )}
    </Formik>
  );
}
