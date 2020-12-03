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
import LibPage from './Pages/LibPage'
import MiniMdDocPage from './Pages/MiniMdDocPage'

// Templates
import GettingStarted from './Pages/Template/GettingStartedPage'
/* END */

import ErrorHandler from './Components/ErrorHandler'

const history = createBrowserHistory()

export default function App()
{
    return (
        <Router history={history}>
            <ErrorHandler>
                <Switch>
                    <Layout exact path='/' component={WelcomePage} />
                    <Layout exact path='/symbol' component={SymbolPage} />
                    <Layout exact path='/search' component={SearchPage} />
                    <Layout exact path='/usercreation' component={UserCreationPage} />
                    <Layout exact path='/userconnection' component={UserConnectionPage} />
                    <Layout exact path='/admin' component={AdminPage} />
                    <Layout exact path='/download' component={DownloadPage} />
                    <Layout exact path='/forgotpassword' component={ForgotPasswordPage} />
                    <Layout exact path='/profile' component={ProfilePage} />
                    <Layout exact path='/updateprofile' component={UserUpdatePage} />
                    <Layout exact path='/contact' component={ContactPage} />
                    <Layout exact path='/faq' component={FAQPage} />
                    <Layout exact path='/privacypolicy' component={PrivacyPolicy} />
                    <Layout exact path='/tou' component={TermsOfUse} />
                    <Layout exact path='/coderecommendations' component={CodeRecommendations} />
                    <Layout exact path='/howtouseparser' component={HowToUseParser} />
                    <Layout exact path='/libraries' component={LibPage}/>
                    <Layout exact path='/gettingstarted' component={GettingStarted}/>
                    <Layout exact path='/mini-markdown-cheat-sheet' component={MiniMdDocPage} />
                    <Layout component={NotFoundPage} />
                </Switch>
            </ErrorHandler>
        </Router>
  );
}