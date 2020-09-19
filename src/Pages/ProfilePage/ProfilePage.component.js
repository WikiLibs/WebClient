import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { checkForm } from '../../util';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import './index.css';

import pp from '../../Components/Header/pp.png'

export default class ProfilePage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        if (this.props.user == null) {
            window.location = "/";
        }

        var tmp = this.props.user.clone();
        console.log(tmp);
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

    handleSubmit = e => {
        e.preventDefault();

        if (checkForm(this.state)) {
            console.log(`
                --SUBMITTING--
                First name: ${this.state.firstName}
                Last name: ${this.state.lastName}
                Email: ${this.state.email}
                Private: ${this.state.private}
                profilMsg: ${this.state.profileMsg}
                Pseudo: ${this.state.pseudo}
                Password: ${this.state.password}
                newPassword: ${this.state.newPassword}
            `)
            if (this.state.password) {
                this.api.patchMe(this.state)
                    .then((Response) => {
                        this.setState({ success: "Successfully updated profile." });
                    })
                    .catch(error => {
                        this.setState({ apiError: this.api.translateErrorMessage(error) });
                    });
            }
        } else {
            console.error("FORM INVALID");
        }
    };

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="profile-content-account">
                        <span>{this.state.pseudo}'s Account</span>
                        <div className="profile-top-form">
                            
                            <div className="profile-form-account">
                                <TextField
                                    id="outlined-name"
                                    label="Pseudo"
                                    className="profile-text-field-acc"
                                    value={this.state.pseudo}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-name"
                                    label="Firstname"
                                    className="profile-text-field-acc"
                                    value={this.state.firstName}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-name"
                                    label="Lastname"
                                    className="profile-text-field-acc"
                                    value={this.state.lastName}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <div className="profile-float-right">
                                <div>
                                    <Card className="profile-card">
                                        <CardMedia
                                            className="profile-pic"
                                            image={pp}
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
                        <div className="profile-bottom-form">
                            <div className="profile-form-account">
                                <TextField
                                    id="outlined-name"
                                    label="Email"
                                    className="profile-text-field-acc"
                                    value={this.state.email}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-name"
                                    className="profile-text-field-acc"
                                    placeholder="Profile message"
                                    margin="normal"
                                    label="Profile message"
                                    variant="outlined"
                                    value={this.state.profileMsg}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Link to="/updateprofile">
                                    <Button
                                        variant="contained"
                                        className="profile-submit-btn"
                                    >UPDATE PROFILE</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="profile-infos">
                            <div className="profile-left-info">
                                <span>Joined : <Moment format="DD/MM/YYYY">{this.state.date}</Moment></span>
                                <span>Group : {this.state.group}</span>
                                <span className="profile-info-down">User ID: {this.state.id}</span>
                            </div>
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