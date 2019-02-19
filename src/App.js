import React, { Component } from 'react';
import Header from './Shared/Header';
import SideBar from './Shared/SideBar';
import Pages from './Pages/PageRegistry';

class App extends Component {
    render() {
        document.title = this.props.page
        const PageComp = Pages[this.props.page];
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <SideBar />
                    <div id="page-content-wrapper">
                        <PageComp {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
