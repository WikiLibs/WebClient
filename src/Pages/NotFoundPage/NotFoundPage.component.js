import React from 'react';

import './style.css'

const NotFoundPage = () => {
    document.title = "404"
    return (
        <div className="Page404">
            <div className='not-found'>Error: could not found page</div>
        </div>
    )
}

export default NotFoundPage
