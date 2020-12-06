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
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import UserUpdatePage from './Pages/UserUpdatePage'
import ContactPage from './Pages/ContactPage'
import FAQPage from './Pages/FAQPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsOfUse from './Pages/TermsOfUse'
import CodeRecommendations from './Pages/CodeRecommendations'
import HowToUseParser from './Pages/HowToUseParser'
import DownloadAppPage from './Pages/DownloadAppPage'
import LibPage from './Pages/LibPage'
import MiniMdDocPage from './Pages/MiniMdDocPage'

/* END */

import ErrorHandler from './Components/ErrorHandler'
import ErrorBoundary from './Components/ErrorBoundary'

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <ErrorBoundary>
                <ErrorHandler>
                    <Switch>
                        <Layout exact path='/' component={WelcomePage} />
                        <Layout exact path='/symbol' component={SymbolPage} />
                        <Layout exact path='/search' component={SearchPage} />
                        <Layout exact path='/register' component={UserCreationPage} />
                        <Layout exact path='/login' component={UserConnectionPage} />
                        <Layout exact path='/admin' component={AdminPage} />
                        <Layout exact path='/download' component={DownloadPage} />
                        <Layout exact path='/forgot-password' component={ForgotPasswordPage} />
                        <Layout exact path='/profile' component={ProfilePage} />
                        <Layout exact path='/update-profile' component={UserUpdatePage} />
                        <Layout exact path='/contact' component={ContactPage} />
                        <Layout exact path='/FAQ' component={FAQPage} />
                        <Layout exact path='/privacy-policy' component={PrivacyPolicy} />
                        <Layout exact path='/terms-of-use' component={TermsOfUse} />
                        <Layout exact path='/codere-commendations-guide' component={CodeRecommendations} />
                        <Layout exact path='/how-to-use-parser' component={HowToUseParser} />
                        <Layout exact path='/download-app' component={DownloadAppPage} />
                        <Layout exact path='/libraries' component={LibPage}/>
                        <Layout exact path='/mini-markdown-cheat-sheet' component={MiniMdDocPage}/>
                        <Layout component={NotFoundPage} />
                    </Switch>
                </ErrorHandler>
            </ErrorBoundary>
        </Router>
  );
}