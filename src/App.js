import React from 'react';
import { Router, Switch } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import Layout from "./Components/Layout"

/* PAGES */
import WelcomePage from './Pages/WelcomePage'
import SymbolPage from './Pages/SymbolPage'
import Search from './Pages/Search'
import NotFound from './Pages/NotFoundPage'
import Subscribe from './Pages/Subscribe';
/* END */

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <Switch>
                <Layout exact path='/' component={WelcomePage} />
                <Layout exact path='/symbol/:sympath+' component={SymbolPage} />
                <Layout exact path='/search/:path+' component={Search} />
                <Layout exact path='/subscribe' component={Subscribe} />

                <Layout component={NotFound} />
            </Switch>
        </Router>
  );
}