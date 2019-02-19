import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Page404 from './Pages/404';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={(props) => <App {...props} page={"Home"} />} />
            <Route exact path="/home" render={(props) => <App {...props} page={"Home"} />} />
            <Route exact path="/symbol/:sympath+" render={(props) => <App {...props} page={"Symbol"} />} />
            <Route exact path="/search/:path+" render={(props) => <App {...props} page={"Search"} />} />
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();
