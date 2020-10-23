import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

import * as ApiService from '../../../services/APIService';

const Logout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    localStorage.clear();
    ApiService.setBearer('');
    authContext.logout();
  });

  return <Redirect to="/login" />;
};

export default Logout;
