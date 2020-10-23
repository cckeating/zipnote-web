import React, { useState } from 'react';
export const AuthContext = React.createContext({
  login: (name, token, userId, expirationDate) => {},
  logout: () => {},
  authState: null,
});

const AuthContextProvider = (props) => {
  const [authState, setAuthState] = useState({
    name: null,
    token: null,
    userId: null,
    expirationDate: null,
  });

  const loginHandler = (name, token, userId, expirationDate) => {
    setAuthState({
      name,
      token,
      userId,
      expirationDate,
    });
  };

  const logoutHandler = () => {
    setAuthState(null);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, logout: logoutHandler, authState }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
