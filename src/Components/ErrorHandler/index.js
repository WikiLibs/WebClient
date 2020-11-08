import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Layout from "../Layout";
import NotFoundPage from '../../Pages/NotFoundPage';

class ErrorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorTitle: "Unknow Error!",
            errorDescription: ""
        }
    }
    
    translateErrorToTItle(code) {
        switch (code) {
            case 400:
                this.setState({
                    errorDescription: "Woops. Looks like something went wrong."
                });
                break;
            case 401:
                this.setState({
                    errorTitle: "Unauthorized!",
                    errorDescription: "Bad credentials and/or Api token."
                });
                break;
            case 403:
                this.setState({
                    errorTitle: "Forbidden!",
                    errorDescription: "Woops. You have no permissions to acces this page with this account."
                });
                break;
            case 404:
                this.setState({
                    errorTitle: "Page Not Found!",
                    errorDescription: "Sorry, we can't find the page you're looking for."
                });
                break;
            case 409:
                this.setState({
                    errorTitle: "Conflict!",
                    errorDescription: "Sorry, your request was invalid."
                });
                break;
            case 500:
                this.setState({
                    errorTitle: "Internal Server Error!",
                    errorDescription: "Woops. Looks like something went wrong in our server.Please report bug if this occurs."
                });
                break;
            default:
                this.setState({
                    errorDescription: "Woops. Looks like something went wrong."
                });
        }
    }

    componentDidMount() {
        let statusCode = window.history.state.state.statusCode;
        if (statusCode) {
            this.translateErrorToTItle(statusCode);
            this.setState({code: statusCode});
        } else {
            this.setState({code: "Uh-oh!"});
        }
    }

    render() {
        document.title = this.state.code;
        return (
            <div className="page-error-handler-title">
                <ErrorOutlineIcon/>
                <div className='page-error-handler-title'>
                    <div><span>{this.state.code}</span> - {this.state.errorTitle} </div>
                    <hr/>
                </div>
                <div className='page-error-handler-description'>{this.state.errorDescription}</div>
                <div className='page-error-handler-todo'>
                    <div className='page-error-handler-todo-title'>You can either:</div>
                    <ul>
                        <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/')}>Visit our home page</li>
                        <li className='page-error-handler-todo-node' onClick={() => window.history.back()}>Return to the previous page</li>
                        <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/contact')}>Contact our support team</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const ErrorHandler = ({ children }) => {
  const location = useLocation();

  switch (get(location.state, 'statusCode')) {
    case 400:
        return <Layout component={ErrorPage}/>;
    case 401:
        return <Layout component={ErrorPage}/>;
    case 403:
        return <Layout component={ErrorPage}/>;
    case 404:
      return <Layout component={NotFoundPage} />;
    case 409:
        return <Layout component={ErrorPage}/>;
    case 500:
        console.log("send error report to api");
        return <Layout component={ErrorPage}/>;
    default:
      return children
  }
};

export default ErrorHandler