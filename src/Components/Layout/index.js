import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ApiService } from '../../ApiService';
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
            userConnected: flag,
            error: this.props.MatchedPage.REQUIRE_SESSION && !flag
        };
    }

    openNavBar() {
        this.setState({ navBar: !this.state.navBar });
    }

    componentDidMount() {
        if (this.state.userConnected) {
            this.api.refresh().then(async () => {
                const response = await this.api.getMe();
                let user = response.data;
                //if the user's permission array is not null, convert it to an easy to use JS object
                if (user.permissions && user.permissions.length > 0) {
                    user.permissionMap = {};
                    user.permissions.forEach(str => {
                        user.permissionMap[str] = true;
                    });
                }
                user.hasPermission = (str) => {
                    if (user.permissionMap == null)
                        return (false);
                    if (user.permissionMap["*"])
                        return (true);
                    if (user.permissionMap[str])
                        return (true);
                    return (false);
                }
                user.clone = () => {
                    return ({
                        id: user.id,
                        registrationDate: user.registrationDate,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        private: user.private,
                        isBot: user.isBot,
                        profileMsg: user.profileMsg,
                        points: user.points,
                        pseudo: user.pseudo,
                        group: user.group
                    });
                }
                this.setState({ user: user });
            }).catch(() => {
                localStorage.setItem('userToken', null);
                this.setState({ user: null, error: true });
            })
        }
        if (this.state.userConnected) {
            let token = localStorage.getItem('userToken');
            let jwt = jwt_decode(token);
            let curtm = new Date().getTime() / 1000;
            if (jwt.exp - curtm <= 60) { // if the token remaining life time is less or equal to 60
                this.api.refresh().catch(err => {
                    localStorage.setItem('userToken', null);
                    this.setState({ user: null, error: true });
                });
            } else if (jwt.exp - curtm < 0) { //Oops token is dead
                localStorage.setItem('userToken', null);
                this.setState({ user: null, error: true });
            }
        }
    }

    attemptRenderBody() {
        //Alert: HACK with static constant
        //React Router you MOTHER FUCKER UNABLE TO PASS PROPS PROPERLY GO LEARN HOW TO CODE
        if (this.props.MatchedPage.REQUIRE_SESSION) {
            if (!this.state.userConnected || !this.state.user) {
                if (this.state.error) {
                    return (
                        <div id="page-content-wrapper">
                            <h1>You need to be connected in order to see this page!</h1>
                        </div>
                    )
                }
                return (
                    <div id="page-content-wrapper">
                        <h1>Loading...</h1>
                    </div>
                );
            } else {
                return (
                    <div id="page-content-wrapper">
                        <this.props.MatchedPage user={this.state.userConnected ? this.state.user : null} {...this.props} />
                    </div>
                );
            }
        } else {
            return (
                <div id="page-content-wrapper">
                    <this.props.MatchedPage user={this.state.userConnected ? this.state.user : null} {...this.props} />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Header user={this.state.userConnected ? this.state.user : null} openNavBar={() => this.openNavBar()} />
                <div id="wrapper" className={this.state.navBar ? "toggled" : ""}>
                    <SideBar user={this.state.userConnected ? this.state.user : null} />
                    {this.attemptRenderBody()}
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