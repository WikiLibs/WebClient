import React, { Component } from 'react';
import ApiService from '../../ApiService';
import Alert from '@material-ui/lab/Alert';
import { checkForm } from '../../util';

import './index.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class ProfilePage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            private: this.props.user.private,
            profileMsg: this.props.user.profileMsg,
            pseudo: this.props.user.pseudo,
            password: '',
            newPassword: '',
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

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length <= 0 ? "minimum 1 character required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length <= 0 ? "minimum 1 character required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
                break;
            case "Pseudo":
                formErrors.pseudo =
                    value.length <= 0 ? "minimum 1 character required" : "";
                break;
            case "Password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    setPrivate(nb) {
        if (nb === 0) {
            this.setState({ private: true });
        } else {
            this.setState({ private: false });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <label>
                        First Name
                        <br />
                        <input
                            type="text"
                            className=""
                            name="firstName"
                            disabled
                            value={this.state.firstName}
                        />
                    </label>
                    <br />
                    <label>
                        Last Name
                        <br />
                        <input
                            type="text"
                            className=""
                            name="lastName"
                            disabled
                            value={this.state.lastName}
                        />
                    </label>
                    <br />
                    <label>
                        Email
                        <br />
                        <input
                            type="email"
                            className=""
                            name="email"
                            disabled
                            value={this.state.email}
                        />
                    </label>
                    <br />
                    <label>
                        Private
                        <br />
                        <select
                            name="private"
                            type="text" onChange={this.handleChange}
                            className=""
                            noValidate
                        >
                            {
                                this.state.private === "true" ?
                                    <option onClick={() => this.setPrivate(0)}>Yes</option> :
                                    <option onClick={() => this.setPrivate(1)}>No</option>
                            }
                            {
                                this.state.private === "true" ?
                                    <option onClick={() => this.setPrivate(1)}>No</option> :
                                    <option onClick={() => this.setPrivate(0)}>Yes</option>
                            }
                        </select>
                    </label>
                    <br />
                    <label>
                        Profil Message
                        <br />
                        <input
                            type="text"
                            className=""
                            name="profileMsg"
                            noValidate
                            value={this.state.profileMsg}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Pseudo
                        <br />
                        <input
                            type="text"
                            className=""
                            name="pseudo"
                            noValidate
                            value={this.state.pseudo}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Password *
                        <br />
                        <input
                            type="password"
                            className=""
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        New Password
                        <br />
                        <input
                            type="password"
                            className=""
                            name="newPassword"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    {this.state.Msg === "error" ? <p>Error during the process</p> :
                        (this.state.Msg === "success" ? <p>Your account is successfully updated !</p> : '')}
                    <input type="submit" value="Modify Profile" />
                </form>
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