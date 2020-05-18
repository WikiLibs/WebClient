import React, { Component } from 'react';
import { AdminService, ApiService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ManageCRUD from './ManageCRUD';

export default class ManageSymbolLangs extends Component {

    state = {
        editing: null
    };

    admin = new AdminService();
    api = new ApiService();

    handleNameChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.name = ev.target.value;
        this.setState({ editing: useless });
    }

    handleDisplayNameChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.displayName = ev.target.value;
        this.setState({ editing: useless });
    }

    openObjectModal = (obj) => {
        if (obj) {
            this.setState({ editing: obj });
        } else {
            this.setState({
                editing: {
                    name: "",
                    displayName: ""
                }
            });
        }
    }

    renderObjectModal = (obj) => {
        return (
            <>
                <TextField
                    label="Identifier (string)"
                    placeholder="Identifier (string)"
                    value={obj.name}
                    onChange={this.handleNameChange}
                />
                <TextField
                    label="Display name"
                    placeholder="Display name"
                    value={obj.displayName}
                    onChange={this.handleDisplayNameChange}
                />
            </>
        );
    }

    renderObject = (obj) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {obj.displayName}
                </Typography>
                <Typography color="textSecondary">
                    Identifier (string): {obj.name}
                </Typography>
                <Typography color="textSecondary">
                    Identifier (number): {obj.id}
                </Typography>
            </>
        );
    }

    render() {
        return (
            <>
                <ManageCRUD
                    // AXIOS
                    get={() => this.api.getSymLangs()}
                    post={(obj) => this.admin.postSymbolLang(obj)}
                    patch={(objid, obj) => this.admin.patchSymbolLang(objid, obj)}
                    delete={(objid) => this.admin.deleteSymbolLang(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.name}
                    typeName="programming language"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Programming Languages"
                />
            </>
        );
    }

}
