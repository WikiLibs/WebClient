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

export default class UserCreation extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            private: true,
            profilMsg: '',
            pseudo: '',
            password: '',
            Msg: '',
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                private: "",
                profilMsg: "",
                pseudo: "",
                password: "",
            }
        };
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
                profilMsg: ${this.state.profilMsg}
                Pseudo: ${this.state.pseudo}
                Password: ${this.state.password}
            `);
            this.api.createUser(this.state)
                .then((Response) => {
                    console.log(Response);
                    this.setState({Msg: "success"});
                })
                .catch( (error) => {
                    this.setState({Msg: "error"});
                    console.log(error);
                })
        } else {
            console.error("FORM INVALID");
            this.setState({Msg: "error"});
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
            this.setState({private: true});
        } else {
            this.setState({private: false});
        }
    }

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
                            noValidate
                            onChange={this.handleChange}
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
                            noValidate
                            onChange={this.handleChange}
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
                            noValidate
                            onChange={this.handleChange}
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
                            <option onClick={() => this.setPrivate(0)}>Yes</option>
                            <option onClick={() => this.setPrivate(1)}>No</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Profil Message
                        <br/>
                        <input
                            type="text"
                            className=""
                            name="profilMsg"
                            noValidate
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
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Password *
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
                    {this.state.Msg === "error" ? <p>Error ! Verify your information and if you don't have already an account</p> : 
                        (this.state.Msg === "success" ? <p>Your account is successfully created !</p> : '')}
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}