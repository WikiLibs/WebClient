import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ApiService from '../../ApiService';
import Header from '../../Components/Header';
import SideBar from '../../Components/SideBar';

class PageBody extends Component {
    api = new ApiService()

    constructor(props) {
        super(props)
        let flag = false;
        if (localStorage.getItem('userToken') != null)
            flag = true;
        this.state = {
            navBar: false,
            userConnected: flag
        }
    }

    //TODO: automatic timer renew token

    openNavBar() {
        this.setState({ navBar: !this.state.navBar });
    }

    componentDidMount() {
        if (this.state.userConnected) {
            this.api.getMe().then(async (data) => {
                this.setState({ user: data.data });
            });
        }
    }

    render() {
        return (
            <div>
                <Header user={this.state.userConnected ? this.state.user : null} openNavBar={() => this.openNavBar()} />
                <div id="wrapper" className={this.state.navBar ? "toggled" : ""}>
                    <SideBar user={this.state.userConnected ? this.state.user : null} />
                    <div id="page-content-wrapper">
                        <this.props.MatchedPage user={this.state.userConnected ? this.state.user : null} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

function Layout({ component: MatchedPage, ...rest }) {
    return (
        <Route {...rest} render={function (matchProps) {
            return (<PageBody MatchedPage={MatchedPage} {...matchProps} />);
        }} />
    );
};

export default withRouter(Layout);