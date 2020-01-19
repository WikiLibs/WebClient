import React, { Component } from 'react';
import ApiService from '../../ApiService';

import './index.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val == null && (valid = false);
    });

    return valid;
};

export default class UserConnection extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
                Password: ${this.state.password}
            `);
            this.api.connectUser(this.state);
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
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <label>
                        Email
                        <br/>
                        <input
                            type="email"
                            className=""
                            name="email"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Password
                        <br/>
                        <input
                            type="password"
                            className=""
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <input type="submit" value="Connect" />
                </form>
            </div>
        );
    }
}