import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import CenterBox from '../../../components/UI/CenterBox';
import { AuthContext } from '../../../context/authContext';
import * as ApiService from '../../../services/APIService';
import { oneHourAhead } from '../../../util/date';

const Login = () => {
  const [formState, setFormState] = useState({
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const textChangeHandler = (event, id) => {
    const state = {
      ...formState,
      [id]: {
        value: event.target.value,
      },
    };

    setFormState(state);
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    const state = { ...formState };
    let hasError;

    if (!state.email.value) {
      hasError = true;
      state.email.error = true;
    }

    if (!state.password.value) {
      hasError = true;
      state.password.error = true;
    }

    if (hasError) {
      return setFormState(state);
    }

    setError(null);
    setLoading(true);

    ApiService.login({
      email: state.email.value,
      password: state.password.value,
    })
      .then((response) => {
        setLoading(false);
        const { data } = response;

        const { name, id, token } = data;

        ApiService.setBearer(token);
        const expirationDate = oneHourAhead(new Date());
        localStorage.setItem(
          'authData',
          JSON.stringify({
            name,
            token,
            id,
            expirationDate: expirationDate,
          })
        );
        authContext.login(name, token, id, expirationDate);
      })
      .catch((err) => {
        setLoading(false);

        setError(err);
      });
  };

  const signupClickHandler = () => {
    history.push('/signup');
  };

  if (authContext.authState?.token) {
    return <Redirect to="/notes" />;
  }

  return (
    <Box
      display="flex"
      height="100%"
      bgcolor="primary.light"
      style={{ minHeight: '100vh' }}
    >
      <Box m="auto" minWidth="25%">
        <Paper>
          <Box px={8} py={12}>
            <Grid container direction="column" alignItems="stretch" spacing={4}>
              <Grid item container justify="center">
                <Grid item>
                  <Typography>
                    <strong>ZIPNOTE</strong>
                  </Typography>
                </Grid>
              </Grid>

              <form noValidate onSubmit={submitClickHandler}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="stretch"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>Login</Typography>
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={formState.email.value}
                      error={formState.email.error}
                      onChange={(event) => textChangeHandler(event, 'email')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      label="Password"
                      value={formState.password.value}
                      error={formState.password.error}
                      onChange={(event) => textChangeHandler(event, 'password')}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    {error && (
                      <Typography color="error">
                        Invalid email or password
                      </Typography>
                    )}
                  </Grid>

                  {loading ? (
                    <Grid item>
                      <CenterBox>
                        <CircularProgress />
                      </CenterBox>
                    </Grid>
                  ) : (
                    <Fragment>
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Login
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={signupClickHandler}
                          fullWidth
                        >
                          Sign up
                        </Button>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </form>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
