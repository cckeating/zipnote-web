import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ApiService from '../../../services/APIService';

const Signup = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    firstName: {
      value: '',
      error: null,
      helperText: null,
    },
    lastName: {
      value: '',
      error: null,
      helperText: null,
    },
    email: {
      value: '',
      error: null,
      helperText: null,
    },
    password: {
      value: '',
      error: null,
      helperText: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const textChangeHandler = (event, id) => {
    const state = {
      ...formState,
      [id]: {
        value: event.target.value,
      },
    };

    setFormState(state);
  };

  const signupButtonClickHandler = () => {
    const state = { ...formState };
    let hasErrors;

    if (!state.firstName.value) {
      hasErrors = true;
      state.firstName.error = true;
    }

    if (!state.lastName.value) {
      hasErrors = true;
      state.lastName.error = true;
    }

    if (!state.email.value) {
      hasErrors = true;
      state.email.error = true;
    }

    if (!state.password.value) {
      hasErrors = true;
      state.password.error = true;
    }

    if (hasErrors) {
      return setFormState(state);
    }

    setError(null);
    setLoading(true);

    ApiService.signup({
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      email: state.email.value,
      password: state.password.value,
    })
      .then((response) => {
        setLoading(false);
        alert('Sucessfully signed up. Login to use Zipnote');
        history.replace('/login');
      })
      .catch((err) => {
        if (err.response.status === 409) {
          const state = {
            ...formState,
            email: {
              ...formState.email,
              error: true,
              helperText: 'Email already in use',
            },
          };
          setFormState(state);
        } else {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      height="100%"
      style={{ minHeight: '100vh' }}
      bgcolor="primary.light"
    >
      <Box m="auto">
        <Paper>
          <Box px={8} py={12}>
            <Grid container direction="column" alignItems="stretch" spacing={4}>
              <Grid item container justify="center">
                <Grid item>
                  <Typography>
                    <strong>Sign up for Zipnote</strong>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="stretch"
                spacing={1}
              >
                <Grid item container spacing={2}>
                  <Grid item>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      value={formState.firstName.value}
                      onChange={(event) =>
                        textChangeHandler(event, 'firstName')
                      }
                      error={formState.firstName.error}
                      helperText={formState.firstName.helperText}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      value={formState.lastName.value}
                      error={formState.lastName.error}
                      onChange={(event) => textChangeHandler(event, 'lastName')}
                      helperText={formState.lastName.helperText}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={formState.email.value}
                    error={formState.email.error}
                    onChange={(event) => textChangeHandler(event, 'email')}
                    helperText={formState.email.helperText}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={formState.password.value}
                    error={formState.password.error}
                    onChange={(event) => textChangeHandler(event, 'password')}
                    helperText={formState.password.helperText}
                    fullWidth
                  />
                </Grid>
                {error && (
                  <Grid item>
                    <Typography color="error">Error Occurred</Typography>
                  </Grid>
                )}
                <Grid item>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={signupButtonClickHandler}
                      fullWidth
                    >
                      Sign up
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
    // <Container maxWidth="xl">

    // </Container>
  );
};

export default Signup;
