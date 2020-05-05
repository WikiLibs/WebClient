import React, { Component } from 'react';
import { AdminService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ManageCRUD from './ManageCRUD';

export default class ManageApps extends Component {

    state = {
        editing: null,
    };

    admin = new AdminService();

    handleAppNameChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.name = ev.target.value;
        this.setState({ editing: useless });
    }

    handleEmailChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.email = ev.target.value;
        this.setState({ editing: useless });
    }

    handleProfileMessageChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.profileMsg = ev.target.value;
        this.setState({ editing: useless });
    }

    handlePseudoChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.pseudo = ev.target.value;
        this.setState({ editing: useless });
    }

    handlePrivateChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.private = ev.target.checked;
        this.setState({ editing: useless });
    }

    openObjectModal = (obj) => {
        if (obj) {
            obj.name = obj.firstName;
            this.setState({ editing: obj });
        } else {
            this.setState({
                editing: {
                    name: "",
                    email: "",
                    private: true,
                    profileMsg: "",
                    pseudo: ""
                }
            });
        }
    }

    renderObjectModal = (obj) => {
        return (
            <Grid container direction="column">
                <TextField
                    label="Name"
                    placeholder="Name"
                    value={obj.name}
                    onChange={this.handleAppNameChange}
                />
                <br />
                <TextField
                    label="Email"
                    placeholder="Email"
                    value={obj.email}
                    onChange={this.handleEmailChange}
                />
                <br />
                <TextField
                    label="Profile message"
                    placeholder="Profile message"
                    value={obj.profileMsg}
                    onChange={this.handleProfileMessageChange}
                />
                <br />
                <TextField
                    label="Pseudo"
                    placeholder="Pseudo"
                    value={obj.pseudo}
                    onChange={this.handlePseudoChange}
                />
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={obj.private}
                            onChange={this.handlePrivateChange}
                            color="primary"
                        />
                    }
                    label="Private"
                />
            </Grid>
        );
    }

    renderObject = (app) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {app.firstName} ({app.private ? "private" : "public"})
                </Typography>
                <Typography color="textSecondary">
                    Created on {new Date(app.registrationDate).toLocaleString()}
                </Typography>
                <Typography color="textSecondary">
                    Guid: {app.id}
                </Typography>
                <Typography color="textSecondary">
                    Email: {app.email}
                </Typography>
                <Typography color="textSecondary">
                    Profile message: {app.profileMsg}
                </Typography>
                <Typography color="textSecondary">
                    Pseudo: {app.pseudo}
                </Typography>
                <Typography color="textSecondary">
                    Group: {app.group}
                </Typography>
            </>
        );
    }

    render() {
        return (
            <>
                <ManageCRUD
                    // AXIOS
                    get={() => this.admin.getApps()}
                    post={(obj) => this.admin.postApp(obj)}
                    patch={(objid, obj) => this.admin.patchApp(objid, obj)}
                    delete={(objid) => this.admin.deleteApp(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.name}
                    typeName="app"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Apps"
                />
            </>
        );
    }

}
