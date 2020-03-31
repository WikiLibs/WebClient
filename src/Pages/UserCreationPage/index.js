import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ApiService from '../../ApiService';

import './index.css';
import footer from '../WelcomePage/imgs/WikiLibs_Logo_Footer.png'

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
            case "pseudo":
                formErrors.pseudo = 
                    value.length <= 0 ? "minimum 1 character required" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            case "private":
                this.state.private = this.state.private ? false : true;
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
            {/* <div>
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
            </div> */}
            <div>
                <div id="Body">
                    <div className="content_account">
                        <span>Create Account</span>
                        <div className="margin_in_form">
                            <form onSubmit={this.handleSubmit} className="form_register" noValidate autoComplete="off">
                                <TextField
                                    label="Firstname *"
                                    placeholder="John"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="firstName"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    className="text_field"
                                />
                                <TextField
                                    label="Lastname *"
                                    placeholder="Doe"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="lastName"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    className="text_field"
                                />
                                <TextField
                                    label="Email *"
                                    placeholder="email"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="email"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    type="email"
                                    className="text_field"
                                />
                                <FormControlLabel
                                    className="control_label"
                                    value="true"
                                    control={<Checkbox color="primary" />}
                                    label="Public account"
                                    labelPlacement="end"
                                    name="private"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    label="Profile message"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="text_field"
                                    placeholder="Put your message here"
                                    margin="normal"
                                    variant="outlined"
                                    name="profilMsg"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    autoFocus
                                    label="Pseudo *"
                                    placeholder="Pseudo"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    className="text_field"
                                    name="pseudo"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    label="Password *"
                                    placeholder="********"
                                    id="outlined-start-adornment"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    type="password"
                                    className="text_field"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="submit_btn"
                                >CREATE ACCOUNT</Button>
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
            </div>
        );
    }
}