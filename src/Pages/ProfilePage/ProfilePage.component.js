import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import './index.css';

import pp from '../../Components/Header/pp.png'

export default class ProfilePage extends Component {
    api = new ApiService();

    static REQUIRE_SESSION = true;

    constructor(props) {
        super(props);

        var tmp = this.props.user.clone();
        this.state = {
            firstName: tmp.firstName,
            lastName: tmp.lastName,
            email: tmp.email,
            private: tmp.private,
            profileMsg: tmp.profileMsg,
            pseudo: tmp.pseudo,
            password: '',
            newPassword: '',
            id: tmp.id,
            date: tmp.registrationDate,
            points: tmp.points,
            group: tmp.group,
            profileImg: pp,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                private: "",
                profileMsg: "",
                pseudo: "",
                password: "",
                newPassword: ""
            },
            apiError: null,
            success: null
        };
    }

    componentDidMount() {
        this.api.getUserIcon(this.props.user.id).then(response => {
            this.setState({profileImg: response});
        });
    }

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="profile-content-account">
                        <span>{this.state.pseudo}'s Account</span>
                        <div className="profile-top-form">
                            <div className="profile-form-account">
                                <div className="profile-value-container">
                                    <div className="profile-value-label-form">Username</div>
                                    <div className="profile-value-form">{this.state.pseudo}</div>
                                </div>
                                <hr />
                                <div className="profile-value-container">
                                    <div className="profile-value-label-form">Firstname</div>
                                    <div className="profile-value-form">{this.state.firstName}</div>
                                </div>
                                <hr />
                                <div className="profile-value-container">
                                    <div className="profile-value-label-form">Lastname</div>
                                    <div className="profile-value-form">{this.state.lastName}</div>
                                </div>
                                <hr />
                                <div className="profile-value-container">
                                    <div className="profile-value-label-form">Email</div>
                                    <div className="profile-value-form">{this.state.email}</div>
                                </div>
                                <hr />
                                <div className="profile-value-container">
                                    <div className="profile-value-label-form">Profile message</div>
                                    <div className="profile-value-form">{this.state.profileMsg}</div>
                                </div>
                                <hr />
                                <Link to="/update-profile">
                                    <Button
                                        variant="contained"
                                        className="profile-submit-btn"
                                    >MODIFY PROFILE</Button>
                                </Link>
                            </div>
                            <div className="profile-float-right">
                                <div>
                                    <Card className="profile-card">
                                        <CardMedia
                                            className="profile-pic"
                                            image={this.state.profileImg}
                                            title=""
                                        />
                                    </Card>
                                    <FormControlLabel
                                        className="profile-control-label"
                                        value=""
                                        control={<Checkbox color="primary" checked={this.state.private} />}
                                        label="Public account"
                                        labelPlacement="end"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="profile-infos">
                            <div className="profile-left-info">
                                <span>Joined : <Moment format="DD/MM/YYYY">{this.state.date}</Moment></span>
                                <span>Group : {this.state.group}</span>
                                <span className="profile-info-down">User ID: {this.state.id}</span>
                            </div>
                            {/* uncomment when usefull */}
                            <div className="profile-vertical-separator"></div>
                            <div className="profile-info-right">
                                <span>User Points</span>
                                <p id="userPoints">{this.state.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.success && <Alert severity="success">{this.state.success}</Alert>}
                {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
                {this.state.formErrors.firstName && <Alert severity="warning">{this.state.formErrors.firstName}</Alert>}
                {this.state.formErrors.lastName && <Alert severity="warning">{this.state.formErrors.lastName}</Alert>}
                {this.state.formErrors.email && <Alert severity="warning">{this.state.formErrors.email}</Alert>}
                {this.state.formErrors.pseudo && <Alert severity="warning">{this.state.formErrors.pseudo}</Alert>}
                {this.state.formErrors.password && <Alert severity="warning">{this.state.formErrors.password}</Alert>}
            </div>
        );
    }
}