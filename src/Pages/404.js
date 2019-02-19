import React, { Component } from 'react';

class Page404 extends Component {
    render() {
        document.title = "404"
        return (
            <div className="Page404">
                <h2>404 Not found</h2>
            </div>
        );
    }
}

export default Page404;
