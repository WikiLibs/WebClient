import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import './style.css'

const NotFoundPage = () => {
    document.title = "404"
    return (
        <div className="page-error-handler-title">
            <ErrorOutlineIcon/>
            <div className='page-error-handler-title'>
                <div><span>404</span> - Page Not Found! </div>
                <hr/>
            </div>
            <div className='page-error-handler-description'>Sorry, we can't find the page you're looking for.</div>
            <div className='page-error-handler-todo'>
                <div className='page-error-handler-todo-title'>You can either:</div>
                <ul>
                    <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/')}>Visit our home page</li>
                    <li className='page-error-handler-todo-node' onClick={() => window.history.back()}>Return to the previous page</li>
                    <li className='page-error-handler-todo-node' onClick={() => window.location.assign('/contact')}>Contact our support team</li>
                </ul>
            </div>
        </div>
    )
}

export default NotFoundPage
