import React, { Component } from 'react';
import { AdminService, ApiService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ManageCRUD from './ManageCRUD';
import {Row} from "react-bootstrap";

export default class ManageSymbolTypes extends Component {

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
                <Row style={{marginBottom: "32px"}}>
                    <TextField
                        label="Identifier (string)"
                        placeholder="Identifier (string)"
                        value={obj.name}
                        onChange={this.handleNameChange}
                    />
                </Row>
                <Row style={{marginBottom: "32px"}}>
                    <TextField
                        label="Display name"
                        placeholder="Display name"
                        value={obj.displayName}
                        onChange={this.handleDisplayNameChange}
                    />
                </Row>
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
                    get={() => this.api.getSymTypes()}
                    post={(obj) => this.admin.postSymbolType(obj)}
                    patch={(objid, obj) => this.admin.patchSymbolType(objid, obj)}
                    delete={(objid) => this.admin.deleteSymbolType(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.name}
                    typeName="symbol type"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Symbol Types"
                />
            </>
        );
    }

}