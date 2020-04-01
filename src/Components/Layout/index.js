import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import ApiService from '../../ApiService';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import SideBar from '../../Components/SideBar';
import jwt_decode from 'jwt-decode';

class PageBody extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        let flag = false;
        if (localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'null')
            flag = true;
        this.state = {
            navBar: false,
            userConnected: flag
        };
    }

    openNavBar() {
        this.setState({ navBar: !this.state.navBar });
    }

    componentDidMount() {
        if (this.state.userConnected) {
            this.api.getMe().then(response => {
                this.setState({ user: response.data });
            }).catch(() => {
                localStorage.setItem('userToken', null);
                this.setState({ user: null });
            });
        }
        if (this.state.userConnected) {
            let token = localStorage.getItem('userToken');
            let jwt = jwt_decode(token);
            let curtm = new Date().getTime() / 1000;
            if (jwt.exp - curtm <= 60) { // if the token remaining life time is less or equal to 60
                this.api.refresh().catch(err => {
                    localStorage.setItem('userToken', null);
                    this.setState({ user: null });
                });
            } else if (jwt.exp - curtm < 0) { //Oops token is dead
                localStorage.setItem('userToken', null);
                this.setState({ user: null });
            }
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
                    <Footer />
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