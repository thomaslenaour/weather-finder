import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { auth } from './firebase';
import UserContext from './contexts/UserContext';
import AuthenticationPage from './pages/authentication';
import DashboardPage from './pages/dashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const userContextValues = { user, setUser };

  useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      setUser(u);
    });
  }, []);

  let routes = (
    <Switch>
      <Route path="/">
        <AuthenticationPage />
      </Route>
    </Switch>
  );

  if (user) {
    routes = (
      <Switch>
        <Route path="/">
          <DashboardPage />
        </Route>
      </Switch>
    );
  }

  return (
    <UserContext.Provider value={userContextValues}>
      <Router>{routes}</Router>
    </UserContext.Provider>
  );
};

export default App;
