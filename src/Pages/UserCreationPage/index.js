import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ApiService } from '../../ApiService';
import { checkForm } from '../../util';

import './index.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class UserCreationPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            private: false,
            profilMsg: '',
            pseudo: '',
            password: '',
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                private: "",
                profilMsg: "",
                pseudo: "",
                password: "",
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
                profilMsg: ${this.state.profilMsg}
                Pseudo: ${this.state.pseudo}
                Password: ${this.state.password}
            `);
            this.api.createUser(this.state)
                .then((Response) => {
                    this.setState({ success: "Successfully created account, please check your email." });
                })
                .catch((error) => {
                    this.setState({ apiError: this.api.translateErrorMessage(error), formErrors: { firstName: "", lastName: "", email: "", private: "", profilMsg: "", pseudo: "", password: "",} });
                    if (error !== null && error !== undefined && error.response !== null && error.response !== undefined && error.response.status === 500)
                        this.props.history.replace(this.props.history.pathname,{statusCode: error.response.status, errorObj: error.response.data});
                })
        } else {
            console.error("FORM INVALID");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        if (name !== "profilMsg") {
            formErrors.firstName = "";
            formErrors.lastName = "";
            formErrors.email = "";
            formErrors.pseudo = "";
            formErrors.password = "";
        }

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length <= 0 ? "Minimum 1 character required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length <= 0 ? "Minimum 1 character required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
                break;
            case "pseudo":
                formErrors.pseudo =
                    value.length <= 0 ? "Minimum 1 character required" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="user-page-content-account">
                        <span>Create Account</span>
                        <div className="user-page-margin-form">
                            <form id="outlined-start-adornment" onSubmit={this.handleSubmit} className="user-page-form-register" noValidate autoComplete="off">
                                <TextField
                                    autoFocus
                                    label="Firstname *"
                                    placeholder="John"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="firstName"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    className="user-page-text-field"
                                />
                                <TextField
                                    label="Lastname *"
                                    placeholder="Doe"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="lastName"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    className="user-page-text-field"
                                />
                                <TextField
                                    label="Email *"
                                    placeholder="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="email"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    type="email"
                                    className="user-page-text-field"
                                />
                                <FormControlLabel
                                    className="connection-control-label"
                                    value="true"
                                    control={<Checkbox onChange={() => this.setState({ private: !this.state.private })} checked={!this.state.private} color="primary" />}
                                    label="Public account"
                                    labelPlacement="end"
                                    name="private"
                                />
                                <TextField
                                    label="Profile message"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="user-page-text-field"
                                    placeholder="Put your message here"
                                    margin="normal"
                                    variant="outlined"
                                    name="profilMsg"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    label="Pseudo *"
                                    placeholder="Pseudo"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    className="user-page-text-field"
                                    name="pseudo"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    label="Password *"
                                    placeholder="********"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="password"
                                    className="user-page-text-field"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="user-page-submit-btn"
                                >CREATE ACCOUNT</Button>
                            </form>
                            {this.state.success && <Alert className="user-warning" severity="success">{this.state.success}</Alert>}
                            {this.state.apiError && <Alert className="user-warning" severity="error">{this.state.apiError}</Alert>}
                            {this.state.formErrors.firstName && <Alert className="user-warning" severity="warning">{this.state.formErrors.firstName}</Alert>}
                            {this.state.formErrors.lastName && <Alert className="user-warning" severity="warning">{this.state.formErrors.lastName}</Alert>}
                            {this.state.formErrors.email && <Alert className="user-warning" severity="warning">{this.state.formErrors.email}</Alert>}
                            {this.state.formErrors.pseudo && <Alert className="user-warning" severity="warning">{this.state.formErrors.pseudo}</Alert>}
                            {this.state.formErrors.password && <Alert className="user-warning" severity="warning">{this.state.formErrors.password}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}