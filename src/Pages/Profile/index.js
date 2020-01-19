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

export default class Profile extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            private: '',
            profileMsg: '',
            pseudo: '',
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
            }
        };

        this.api.getMe().then((Response) => {
            console.log(Response.data);

            this.setState(Response.data);
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                First name: ${this.state.firstName}
                Last name: ${this.state.lastName}
                Email: ${this.state.email}
                Private: ${this.state.private}
                profilMsg: ${this.state.profileMsg}
                Pseudo: ${this.state.pseudo}
                Password: ${this.state.password}
            `);
            this.api.patchMe(this.state);
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <label>
                        First Name *
                        <br/>
                        <input
                            type="text"
                            className=""
                            name="firstName"
                            disabled
                            value={this.state.firstName}
                        />
                    </label>
                    <br/>
                    <label>
                        Last Name *
                        <br/>
                        <input
                            type="text"
                            className=""
                            name="lastName"
                            disabled
                            value={this.state.lastName}
                        />
                    </label>
                    <br/>
                    <label>
                        Email *
                        <br/>
                        <input
                            type="email"
                            className=""
                            name="email"
                            disabled
                            value={this.state.email}
                        />
                    </label>
                    <br/>
                    <label>
                        Private
                        <br/>
                        <select 
                            name="private" 
                            type="text" onChange={this.handleChange}
                            className=""
                            noValidate
                        >
                            <option value="yes" defaultValue>Yes</option>
                            <option value="no">No</option>  
                        </select>
                    </label>
                    <br/>
                    <label>
                        Profil Message
                        <br/>
                        <input
                            type="text"
                            className=""
                            name="profileMsg"
                            noValidate
                            value={this.state.profileMsg}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Pseudo *
                        <br/>
                        <input
                            type="text"
                            className=""
                            name="pseudo"
                            noValidate
                            value={this.state.pseudo}
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
                    <label>
                        New Password
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
                    <input type="submit" value="Modify Profile" />
                </form>
            </div>
        );
    }
}