import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

class PageBody extends Component {
    state = {
        navBar: false
    };

    openNavBar() {
        this.setState({navBar: !this.state.navBar});
    }

    render() {
        return (
            <div>
                <Header openNavBar={() => this.openNavBar()} />
                <div id="wrapper" className={this.state.navBar ? "toggled" : ""}>
                    <SideBar />
                    <div id="page-content-wrapper">
                        <this.props.MatchedPage {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

function Layout ({component: MatchedPage, ...rest})
{
    return (
        <Route {...rest} render={function (matchProps)
        {
            return (<PageBody MatchedPage={MatchedPage} {...matchProps} />);
        }} />
  );
};

export default withRouter(Layout);