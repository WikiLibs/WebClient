import React, { Component } from 'react'

import { ApiService } from '../../ApiService';
import logo from '../../Pages/WelcomePage/imgs/WikiLibs_Logo.png';

class ErrorBoundary extends Component {

    api = new ApiService();

    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null, hasError: false };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
    
    render() {
      if (this.state.hasError && this.state.error) {
        this.api.sendError(this.state.error.toString(), this.state.errorInfo.componentStack);
        return (
          <div className="page-maintenance">
              <div className="page-maintenance-logo">
                  <img className="page-maintenance-logo-img" src={logo} alt=""/>
              </div>
              <div className="page-maintenance-sub-title">
                  <div>Sorry, this page is down for maintenance</div>
                  <p>The page will be back up soon.</p>
              </div>
              <div className='page-error-handler-todo'>
                  <div className='page-error-handler-todo-title'>You can either:</div>
                  <ul>
                      <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/')}>Visit our home page</li>
                      <li className='page-error-handler-todo-node' onClick={() => window.history.back()}>Return to the previous page</li>
                      <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/contact')}>Contact our support team</li>
                      <li className='page-error-handler-todo-node' onClick={() => window.location.href = "https://twitter.com/WikiLibs_/"}>Follow us on Twitter for updates</li>
                  </ul>
              </div>
          </div>       
        )
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary;