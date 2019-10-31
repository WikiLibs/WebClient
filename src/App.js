import React from 'react';
import { Router, Switch } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import Layout from "./Components/Layout"

/* PAGES */
import Welcome from './Pages/Welcome'
import Symbol from './Pages/Symbol'
import Search from './Pages/Search'
import NotFound from './Pages/NotFound'
import TestEZ from './Pages/TestEZ'
/* END */

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <Switch>
                <Layout exact path='/' component={Welcome} />
                <Layout exact path='/symbol/:sympath+' component={Symbol} />
                <Layout exact path='/search/:path+' component={Search} />
                <Layout exact path='/test' component={TestEZ} />

                <Layout component={NotFound} />
            </Switch>
        </Router>
  );
}