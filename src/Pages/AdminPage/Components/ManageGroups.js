import React, { Component } from 'react';
import { AdminService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ManageCRUD from './ManageCRUD';

export default class ManageGroups extends Component {

    state = {
        editing: null,
        newPerm: "",
    };

    admin = new AdminService();

    removeItem(id) {
        this.state.editing.permissions.splice(id, 1);
        this.setState({ editing: this.state.editing });
    }

    addItem = () => {
        let p = this.state.newPerm;
        for (let k in this.state.editing.permissions) {
            if (this.state.editing.permissions[k] === p)
                return;
        }
        this.state.editing.permissions.push(p);
        this.setState({ newPerm: "", editing: this.state.editing });
    }

    handleGroupNameChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.name = ev.target.value;
        this.setState({ editing: useless });
    }

    openObjectModal = (obj) => {
        if (obj) {
            this.setState({ editing: obj });
        } else {
            this.setState({
                editing: {
                    name: "",
                    permissions: []
                }
            });
        }
    }

    renderObjectModal = (obj) => {
        return (
            <>
                <TextField
                    label="Group name"
                    placeholder="Group name"
                    value={obj.name}
                    onChange={this.handleGroupNameChange}
                />
                <List>
                    {
                        obj.permissions.map((perm, id) =>
                            <ListItem key={perm}>
                                <ListItemText primary={perm} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => this.removeItem(id)} edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                    <ListItem>
                        <TextField
                            label="Permission"
                            value={this.state.newPerm}
                            onChange={(ev) => this.setState({ newPerm: ev.target.value })}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={this.addItem} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </>
        );
    }

    renderObject = (grp) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {grp.name}
                </Typography>
                <Typography color="textSecondary">
                    Permissions:
                </Typography>
                <Typography variant="body2" component="p">
                    {
                        grp.permissions.map(perm =>
                            <React.Fragment key={perm}>{perm}<br /></React.Fragment>
                        )
                    }
                </Typography>
            </>
        );
    }

    render() {
        return (
            <>
                <ManageCRUD
                    //AXIOS
                    get={() => this.admin.getGroups()}
                    post={(obj) => this.admin.postGroup(obj)}
                    patch={(objid, obj) => this.admin.patchGroup(objid, obj)}
                    delete={(objid) => this.admin.deleteGroup(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.name}
                    typeName="group"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Groups"
                />
            </>
        );
    }

}