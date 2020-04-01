import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import ApiService from '../../ApiService';
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
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);
            //Handle errors similar to this
            this.api.connectUser(this.state).catch(err => this.setState({ apiError: this.api.translateErrorMessage(err) }));
        } else {
            console.error("FORM INVALID");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
                break;
            case "Password":
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
                    <div className="content_account">
                        <span>Sign in</span>
                        <div className="margin_in_form">
                            <form id="outlined-start-adornment" onSubmit={this.handleSubmit} className="form_register" noValidate autoComplete="off">
                                <TextField
                                    label="Email"
                                    placeholder="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    className="text_field"
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
                                    className="text_field"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="submit_btn"
                                >
                                    LOGIN
                                </Button>
                                <div className="no_account">
                                    <span>Don't have an account yet ? You can <a href="/Register">register</a> !</span>
                                </div>
                            </form>
                            {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
                            {this.state.formErrors.email && <Alert severity="warning">{this.state.formErrors.email}</Alert>}
                            {this.state.formErrors.password && <Alert severity="warning">{this.state.formErrors.password}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}