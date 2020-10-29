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
            formErrors: {
                email: "",
            },
            apiError: null
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (checkForm(this.state)) {
            this.api.resetPassword(this.state.email).catch(err => this.setState({ apiError: this.api.translateErrorMessage(err) }));
            this.setState({formErrors: { email: "" }});
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
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="forgot-content-account">
                        <span>Account recovery</span>
                        <div className="forgot-margin-form">
                            <form id="outlined-start-adornment" onSubmit={this.handleSubmit} className="forgot-form-register" noValidate autoComplete="off">
                                <TextField
                                    label="Email"
                                    placeholder="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    className="forgot-text-field"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="forgot-submit-btn"
                                >
                                    NEXT
                                </Button>
                            </form>
                            {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
                            {this.state.formErrors.email && <Alert severity="warning">{this.state.formErrors.email}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}