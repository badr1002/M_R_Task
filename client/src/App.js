import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from './pages/register'
import Login from './pages/login';
import Values from './pages/values';
import NavBar from './components/nav'
import React from 'react';
function App() {
  return (
    <React.Fragment >
      <BrowserRouter>
      <NavBar/>
        <Switch>
          <Route path="/values" component={Values} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/values" />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
