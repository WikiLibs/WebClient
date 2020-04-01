import React from 'react';
import { Router, Switch } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import Layout from "./Components/Layout"

/* PAGES */
import WelcomePage from './Pages/WelcomePage'
import SymbolPage from './Pages/SymbolPage'
import SearchPage from './Pages/SearchPage'
import UserCreationPage from './Pages/UserCreationPage'
import UserConnectionPage from './Pages/UserConnectionPage';
import ProfilePage from './Pages/ProfilePage';
import NotFoundPage from './Pages/NotFoundPage'

/* END */

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <Switch>
                <Layout exact path='/' component={WelcomePage} />
                <Layout exact path='/symbol/:sympath+' component={SymbolPage} />
                <Layout exact path='/search/:path+' component={SearchPage} />
                <Layout exact path='/usercreation' component={UserCreationPage} />
                <Layout exact path='/userconnection' component={UserConnectionPage} />
                <Layout exact path='/profile' component={ProfilePage} />

                <Layout component={NotFoundPage} />
            </Switch>
        </Router>
  );
}