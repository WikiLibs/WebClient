import React from 'react';
import { Router, Switch } from 'react-router-dom';

import { createBrowserHistory } from "history";

import Layout from "./Components/Layout";

/* PAGES */
import WelcomePage from './Pages/WelcomePage';
import SymbolPage from './Pages/SymbolPage';
import SearchPage from './Pages/SearchPage';
import UserCreationPage from './Pages/UserCreationPage';
import UserConnectionPage from './Pages/UserConnectionPage';
import ProfilePage from './Pages/ProfilePage';
import NotFoundPage from './Pages/NotFoundPage'
import AdminPage from './Pages/AdminPage'
import DownloadPage from './Pages/DownloadPage'
/* END */

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <Switch>
                <Layout exact path='/' component={WelcomePage} />
                <Layout exact path='/symbol' component={SymbolPage} />
                <Layout exact path='/search' component={SearchPage} />
                <Layout exact path='/usercreation' component={UserCreationPage} />
                <Layout exact path='/userconnection' component={UserConnectionPage} />
                <Layout exact path='/profile' component={ProfilePage} />
                <Layout exact path='/admin' component={AdminPage} />
                <Layout exact path='/download' component={DownloadPage} />
                <Layout component={NotFoundPage} />
            </Switch>
        </Router>
  );
}