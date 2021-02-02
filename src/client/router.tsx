import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import CSS from './page/CSS';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/CSS" component={CSS} exact />

      {/* <Route path="/2021" component={CurrentYear} exact />
      <Route path="/2019" component={PastYear} exact />
      <Route path="/2018" component={PastYear} exact />
      <Route path="/2017" component={PastYear} exact /> */}
    </Switch>
  );
}

export default Routes;
