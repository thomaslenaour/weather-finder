import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { auth } from './firebase';

import UserContext from './contexts/UserContext';

// import AuthenticationPage from './pages/authentication';
// import DashboardPage from './pages/dashboard';

import Spinner from './components/Spinner';

const AuthenticationPage = React.lazy(() => import('./pages/authentication'));
const DashboardPage = React.lazy(() => import('./pages/dashboard'));

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

  const fallbackComponent = (
    <div className="flex justify-center items-center h-screen w-full">
      <Spinner big />
    </div>
  );

  return (
    <UserContext.Provider value={userContextValues}>
      <Router>
        <Suspense fallback={fallbackComponent}>{routes}</Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
