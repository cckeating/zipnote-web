import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';
import { AuthContext } from './context/authContext';
import Layout from './hoc/Layout/Layout';
import Notes from './containers/Notes/Notes';
import * as ApiService from './services/APIService';
import Note from './containers/Notes/Note/Note';
import Logout from './containers/Auth/Logout/Logout';

const App = () => {
  const authContext = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem('authData');

    if (authData) {
      const { name, token, id, expirationDate } = JSON.parse(authData);
      const expDate = new Date(expirationDate);

      // Token still valid or not
      if (expDate > new Date()) {
        ApiService.setBearer(token);
        authContext.login(name, token, id, expirationDate);
      } else {
        authContext.logout();
      }
    }
    setLoaded(true);
  }, []);

  // Wait for useEffect to be called and finish.
  if (!loaded) {
    return <div></div>;
  }

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" render={(props) => <Redirect to="/login" />} />
    </Switch>
  );

  if (authContext.authState?.token) {
    routes = (
      <Layout>
        <Switch>
          <Route
            path="/notes/create"
            exact
            render={(props) => <Note {...props} create />}
          />
          <Route path="/notes/:id" component={Note} />
          <Route path="/notes" component={Notes} />
          <Route path="/logout" component={Logout} />

          <Route path="/" render={(props) => <Redirect to="/notes" />} />
        </Switch>
      </Layout>
    );
  }

  return <Fragment>{routes}</Fragment>;
};

export default App;
