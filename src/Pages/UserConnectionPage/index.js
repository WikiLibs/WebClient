import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { ApiService } from '../../ApiService';
import { checkForm } from '../../util';

import './index.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class UserConnectionPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: "",
                password: ""
            },
            apiError: null
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (checkForm(this.state)) {
            //Handle errors similar to this
            this.api.connectUser(this.state).catch(err => {
                this.setState({ apiError: this.api.translateErrorMessage(err), formErrors: {email: "", password: ""} })
                if (err !== null && err !== undefined && err.response !== null && err.response !== undefined && err.response.status === 500)
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            });
        } else {
            console.error("FORM INVALID");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        formErrors.password = "";
        formErrors.email = "";
        this.setState({ apiError: null });

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
                break;
            case "password":
                formErrors.password = value.length < 6 ? "Minimum 6 characters required" : "";
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
                        <span>Sign in</span>
                        <div className="user-page-margin-form">
                            <form id="outlined-start-adornment" onSubmit={this.handleSubmit} className="user-page-form-register" noValidate autoComplete="off">
                                <TextField
                                    label="Email"
                                    placeholder="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    className="user-page-text-field"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    label="Password"
                                    placeholder="********"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    className="user-page-text-field"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="user-page-submit-btn"
                                >
                                    LOGIN
                                </Button>
                            </form>
                            {this.state.apiError && <Alert className="user-warning" severity="error">{this.state.apiError}</Alert>}
                            {this.state.formErrors.email && <Alert className="user-warning" severity="warning">{this.state.formErrors.email}</Alert>}
                            {this.state.formErrors.password && <Alert className="user-warning" severity="warning">{this.state.formErrors.password}</Alert>}
                            <div className="connection-no-account">
                                <span>Don't have an account yet ? You can <a href="/register">register</a> !</span>
                                <span className="connection-span-float-right"><a href="/forgot-password">Forgot password ?</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}