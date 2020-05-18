import React, { Component } from 'react';
import { AdminService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ManageCRUD from './ManageCRUD';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Icon } from '@iconify/react';
import ContentCopy from '@iconify/icons-mdi/content-copy';
import { setClipboardData } from '../../../util';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default class ManageApps extends Component {

    state = {
        editing: null,
        objectSecret: null,
        groups: [],
        groupMap: {}
    };

    admin = new AdminService();

    eventPostObjectUpdateCreate = (robject) => {
        let newSecret = robject.secret;
        this.setState({ objectSecret: newSecret });
    }

    eventPreLoad = () => {
        this.admin.getGroups().then((response) => {
            let map = {};
            response.data.forEach(v => {
                map[v.name] = v.id;
            });
            this.setState({ groups: response.data, groupMap: map });
        });
    }

    events = {
        postObjectCreate: this.eventPostObjectUpdateCreate,
        postObjectUpdate: this.eventPostObjectUpdateCreate,
        preLoad: this.eventPreLoad
    };

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

    handleGroupChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.groupId = parseInt(ev.target.value);
        this.setState({ editing: useless });
    }

    openObjectModal = (obj) => {
        if (obj) {
            obj.name = obj.firstName;
            obj.groupId = this.state.groupMap[obj.group]; //Convert group name to id
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
                <FormControl>
                    <InputLabel id="1">Group</InputLabel>
                    <Select
                        labelId="1"
                        value={obj.groupId}
                        onChange={this.handleGroupChange}
                    >
                        {
                            this.state.groups.map(v =>
                                <MenuItem value={v.id} key={v.id}>{v.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
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
                    Identifier: {app.id}
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

    renderNewSecretModal() {
        return (
            <Dialog open={this.state.objectSecret !== null} onClose={() => this.setState({ objectSecret: null })} maxWidth="sm" fullWidth>
                <DialogTitle>Your new app secret</DialogTitle>
                <DialogContent>
                    The new secret key for your application is:
                    <Grid container direction="row" alignItems="center" justify="center">
                        <TextField value={this.state.objectSecret} disabled={false} />
                        <IconButton onClick={() => setClipboardData(this.state.objectSecret)}>
                            <Icon icon={ContentCopy} />
                        </IconButton>
                    </Grid>
                    <br />
                    Remember to copy it! You'll need to regenerate a new one if you loose it.
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={() => this.setState({ objectSecret: null })}>OK</Button>
                </DialogActions>
            </Dialog >
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
                    getObjectName={(obj) => obj.firstName}
                    typeName="app"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Apps"
                    events={this.events}
                />
                {this.state.objectSecret && this.renderNewSecretModal()}
            </>
        );
    }

}
