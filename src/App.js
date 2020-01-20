import React from 'react';
import { Router, Switch } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import Layout from "./Components/Layout"

/* PAGES */
import WelcomePage from './Pages/WelcomePage'
import SymbolPage from './Pages/SymbolPage'
import Search from './Pages/Search'
import UserCreation from './Pages/UserCreation'
import UserConnection from './Pages/UserConnection';
import ProfilePage from './Pages/ProfilePage';
import NotFound from './Pages/NotFoundPage'

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
                <Layout exact path='/usercreation' component={UserCreation} />
                <Layout exact path='/userconnection' component={UserConnection} />
                <Layout exact path='/profile' component={ProfilePage} />

                <Layout component={NotFound} />
            </Switch>
        </Router>
  );
}