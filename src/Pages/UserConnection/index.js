import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApiService from '../../ApiService';

import './index.css';

import footer from './imgs/WikiLibs_Logo_Footer.png'

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
            {/* <div>
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
            </div> */}
                <div id="Body">
                    <div className="content_account">
                        <span>Sign in</span>
                        <div className="margin_in_form">
                            <form onSubmit={this.handleSubmit} className="form_register" noValidate autoComplete="off">
                                <TextField
                                    label="Email"
                                    placeholder="email"
                                    id="outlined-start-adornment"
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
                                    id="outlined-start-adornment"
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
                        </div>
                    </div>
                </div>
                <div id="Footer">
                    <div className="footer_container">
                        <div className="copyright">
                            <img className="logo_footer" src={footer} alt=""></img>
                            <span className="copyright_txt">WikiLibs &copy; 2019</span>
                        </div>
                        <div className="useful">
                            <a href="#CONTACT">CONTACT</a>
                            <a href="#HELP">HELP AND FAQ</a>
                            <a href="#TERMSOFUSE">TERMS OF USE</a>
                            <a href="#PRIVACY">PRIVACY POLICY</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}