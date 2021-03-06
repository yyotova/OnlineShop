import React, { ReactElement, useState, useEffect } from "react";
import { Button, Box, SnackbarContent } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginAction } from "../../actions/userActions";
import { ReduxState } from "../../models/shared-types";
import { string, object } from "yup";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { RegisterAndUpdateActions } from "../../models/user-types";
import useStyles from "../styles";

interface RegUserVals {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Registration(): ReactElement {
  const [regVals, setRegVals] = useState<RegUserVals>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const userRegister: RegisterAndUpdateActions = useSelector(
    (state: ReduxState) => state.userRegister
  );
  const { userInfo, success, error } = userRegister;
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/products";

  const handleClick = () => {
    window.location.reload();
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClick}>
      Try Again!
    </Button>
  );

  useEffect(() => {
    if (success) dispatch(loginAction(regVals.email, regVals.password));
    if (userInfo) history.push(redirect);
    dispatch(
      registerUser(
        regVals.firstName,
        regVals.lastName,
        regVals.email,
        regVals.password
      )
    );
  }, [userInfo, dispatch, history]);

  return (
    <Formik
      initialValues={regVals}
      validationSchema={object({
        firstName: string()
          .required("Required")
          .trim()
          .min(4, "must be at least 4 characters")
          .max(14, "must be at most 14 characters"),
        lastName: string()
          .required("Required")
          .trim()
          .min(4, "must be at least 4 characters")
          .max(14, "must be at most 14 characters"),
        email: string().email("Must be valid").required("Required").trim(),
        password: string()
          .required()
          .trim()
          .min(8, "Must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain 1 uppercase, 1 lowercase, 1 number and one special case character"
          ),
      })}
      onSubmit={({ firstName, lastName, email, password }) => {
        setRegVals({ firstName, lastName, email, password });
        dispatch(registerUser(firstName, lastName, email, password));
      }}
    >
      {({ values, handleChange }) => (
        <Box display="flex" justifyContent="center" margin="100px">
          <Form autoComplete="off">
            <Box display="flex" justifyContent="center" alignItems="center">
              <h1>Register</h1>
            </Box>
            <div>
              <Field
                fullWidth
                name="firstName"
                component={TextField}
                label="First Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="lastName"
                component={TextField}
                label="Last Name"
                onChange={handleChange}
              />
            </div>
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
              <Button variant="contained" className={classes.btn} type="submit">
                Sign Up
              </Button>
            </Box>
            <p>
              Already have an registration?{"  "}
              <Link to="login" style={{ color: "#3686ad" }}>
                Log In here.
              </Link>
            </p>
            {error && (
              <SnackbarContent
                message="E-mail already taken!"
                action={action}
              />
            )}
          </Form>
        </Box>
      )}
    </Formik>
  );
}
