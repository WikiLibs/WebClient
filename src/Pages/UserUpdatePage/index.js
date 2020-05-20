import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { checkForm } from '../../util';
import Moment from 'react-moment';

import CreateIcon from '@material-ui/icons/Create';

import './index.css';

/*import pp from '../../Components/Header/pp.png'*/


export default class ProfilePage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
    
        if (this.props.user == null) {
            window.location = "/";
        }

        this.state = {
            private: this.props.user.private,
            profileMsg: this.props.user.profileMsg,
            pseudo: this.props.user.pseudo,
            password: '',
            newPassword: '',
            id: this.props.user.id,
            date: this.props.user.registrationDate,
            points: this.props.user.points,
            group: this.props.user.group,
            profileImg: null,
            formErrors: {
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
                Private: ${this.state.private}
                profilMsg: ${this.state.profileMsg}
                Pseudo: ${this.state.pseudo}
                Password: ${this.state.password}
                newPassword: ${this.state.newPassword}
            `)
            if (this.state.password) {
                this.api.patchMe(this.state)
                    .then(_ => {
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
            case "pseudo":
                formErrors.pseudo =
                    value.length <= 0 ? "minimum 1 character required" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            case "newPassword":
                formErrors.newPassword =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleCheckboxChange = event => {
    this.setState({ private: event.target.checked })}

    profileImgUpdate = event => {
        console.log(event.target.files[0]);
        this.setState({ profileImg: URL.createObjectURL(event.target.files[0])});
    }

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="content_account">
                        <span>{this.state.pseudo}'s Account Update</span>
                        <div className="top_form">
                            <div className="form_account">
                                <TextField
                                    name="pseudo"
                                    id="outlined-name"
                                    label="Pseudo"
                                    className="text_field_acc"
                                    value={this.state.pseudo}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="profileMsg"
                                    id="outlined-name"
                                    className="text_field_acc"
                                    placeholder="Profile message"
                                    margin="normal"
                                    label="Profile message"
                                    variant="outlined"
                                    value={this.state.profileMsg}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="password"
                                    id="outlined-name"
                                    className="text_field_acc"
                                    placeholder="Password *"
                                    margin="normal"
                                    label="Password *"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form_float_right">
                                <div>
                                    <Card className="profile_card">
                                        <div>
                                            <input type="file" id="file" name="file" className="inputfile" onChange={this.profileImgUpdate} />
                                            <label for="file"><CreateIcon/></label>
                                        </div>
                                        <CardMedia
                                            className="profile_pic"
                                            image={this.state.profileImg}
                                            title=""
                                        />
                                    </Card>
                                    <FormControlLabel
                                        className="control_label"
                                        value=""
                                        control={<Checkbox color="primary" checked={this.state.private} onChange={this.handleCheckboxChange} />}
                                        label="Public account"
                                        labelPlacement="end"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom_form">
                            <div className="form_account">
                            <TextField
                                    name="newPassword"
                                    id="outlined-name"
                                    className="text_field_acc"
                                    placeholder="New Password (Optional)"
                                    margin="normal"
                                    label="New Password (Optional)"
                                    variant="outlined"
                                    value={this.state.newPassword}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    className="submit_btn_acc"
                                    onClick={this.handleSubmit}
                                > SAVE UPDATE</Button>
                            </div>
                        </div>
                        <div className="profile_infos">
                            <div className="left_info">
                                <span>Joined : <Moment format="DD/MM/YYYY">{this.state.date}</Moment></span>
                                <span>Group : {this.state.group}</span>
                                <span className="info_down">User ID: {this.state.id}</span>
                            </div>
                            <div className="right_info">
                                <span>User Points</span>
                                <p id="userPoints">{this.state.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
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