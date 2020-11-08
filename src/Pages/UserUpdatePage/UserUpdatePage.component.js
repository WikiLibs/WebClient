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

import CircularProgress from '@material-ui/core/CircularProgress';
import CreateIcon from '@material-ui/icons/Create';

import './index.css';

import pp from '../../Components/Header/pp.png'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";


export default class UserUpdatePage extends Component {
    api = new ApiService();

    static REQUIRE_SESSION = true;

    constructor(props) {
        super(props);

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
            profileImg: pp,
            formErrors: {
                private: "",
                profileMsg: "",
                pseudo: "",
                password: "",
                newPassword: ""
            },
            apiError: null,
            success: null,
            loading: false
        };
    }

    componentDidMount() {
        this.api.getUserIcon(this.props.user.id).then(response => {
            this.setState({profileImg: response});
        });
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
                        setTimeout(
                            window.location.assign(window.location.origin + '/profile'), 1500
                        )
                    })
                    .catch(error => {
                        this.setState({ apiError: this.api.translateErrorMessage(error) });
                        if (error !== null && error !== undefined && error.response !== null && error.response !== undefined && error.response.status === 500)
                            this.props.history.replace(this.props.history.pathname,{statusCode: error.response.status, request: this.state});
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
        this.setState({ private: event.target.checked })
    }

    profileImgUpdate = event => {
        this.setState({ loading: true, profileImg: URL.createObjectURL(event.target.files[0])});
        this.api.setIconMe(event.target.files[0]).then(() => this.setState({loading: false}));
    }

    renderLoadingDialog() {
        return (
            <Dialog open={this.state.loading}>
                <DialogContent className="dialog-upload-img">
                    <CircularProgress />
                    <span>Uploading new image</span>
                </DialogContent>
            </Dialog>
        );
    }

    render() {
        return (
            <div>
                <div id="Body">
                    <div className="update-profile-content-account">
                        <span>{this.state.pseudo}'s Account Update</span>
                        <div className="profile-top-form">
                            <div className="profile-form-account">
                                <TextField
                                    name="pseudo"
                                    label="Pseudo"
                                    className="profile-text-field-acc"
                                    value={this.state.pseudo}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name="profileMsg"
                                    className="profile-text-field-acc"
                                    placeholder="Profile message"
                                    margin="normal"
                                    label="Profile message"
                                    variant="outlined"
                                    value={this.state.profileMsg}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    type="password"
                                    name="newPassword"
                                    className="profile-text-field-acc"
                                    placeholder="New Password (Optional)"
                                    margin="normal"
                                    label="New Password (Optional)"
                                    variant="outlined"
                                    value={this.state.newPassword}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="update-profile-form-float-right">
                                <div>
                                    <Card className="update-profile-profile-card">
                                        <div>
                                            <input type="file" id="file" name="file" className="update-profile-inputfile" onChange={this.profileImgUpdate} />
                                            <label htmlFor="file"><CreateIcon/></label>
                                        </div>
                                        <CardMedia
                                            className="profile-pic"
                                            image={this.state.profileImg}
                                            title=""
                                        />
                                    </Card>
                                    <FormControlLabel
                                        className="update-profile-control-label"
                                        value=""
                                        control={<Checkbox color="primary" checked={this.state.private} onChange={this.handleCheckboxChange} />}
                                        label="Public account"
                                        labelPlacement="end"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="profile-bottom-form">
                            <div className="profile-form-account">
                                <TextField
                                    type="password"
                                    name="password"
                                    className="profile-text-field-acc"
                                    placeholder="Password *"
                                    margin="normal"
                                    label="Password *"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    variant="contained"
                                    className="update-profile-submit-btn-acc"
                                    onClick={this.handleSubmit}
                                > SAVE UPDATE</Button>
                                {this.state.success && <Alert className="user-warning"  severity="success">{this.state.success}</Alert>}
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
                {this.renderLoadingDialog()}
            </div>
        );
    }
}