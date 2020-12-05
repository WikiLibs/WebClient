import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { ApiService } from '../../ApiService';
import { checkForm } from '../../util';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from '@material-ui/core/CircularProgress';

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
            apiError: null,
            loading: false,
            loadingMessage: ""
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (checkForm(this.state) && this.state.formErrors.email === "" && this.state.email.length !== 0 && emailRegex.test(this.state.email)) {
            this.api.resetPassword(this.state.email).catch(err => {
                this.setState({ apiError: this.api.translateErrorMessage(err) })
                if (err !== null && err !== undefined && err.response !== null && err.response !== undefined && err.response.status === 500)
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            }).then(() => this.setState({loadingMessage: "Please check your emails, you should have received a new temporary password"}), setTimeout(() => {
                window.location.assign(window.location.origin + '/login');
            }, 7000));
            this.setState({formErrors: { email: "" }, loading: true});
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

    renderLoadingDialog() {
        return (
            <Dialog open={this.state.loading}>
                <DialogContent className="dialog-upload-img">
                    {this.state.loadingMessage === "" ? <><CircularProgress /><span>Loading</span></> : ""}
                    <span>{this.state.loadingMessage}</span>
                </DialogContent>
            </Dialog>
        );
    }

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
                {this.renderLoadingDialog()}
            </div>
        );
    }
}