import React, { Component } from 'react';
import { AdminService } from '../../../ApiService';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { DialogContentText } from '@material-ui/core';

export default class ManageGroups extends Component {

    state = {
        groups: [],
        editing: null,
        newPerm: "",
        isNew: false,
        apiError: null,
        success: null,
        showConfirmModal: null,
        deleteId: null
    };

    admin = new AdminService();

    reloadFromApi() {
        this.admin.getGroups().then(response => {
            this.setState({ groups: response.data });
        }).catch((error) => {
            this.setState({ apiError: this.api.translateErrorMessage(error) });
        });
    }

    componentDidMount() {
        this.reloadFromApi();
    }

    openEditModal(group) {
        let copy = JSON.parse(JSON.stringify(group)); //Make a copy of the group data before starting to modify
        this.setState({ isNew: false, editing: copy });
    }

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

    openNewModal = () => {
        this.setState({
            isNew: true,
            editing: {
                name: "",
                permissions: []
            }
        });
    }

    handleGroupNameChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.name = ev.target.value;
        this.setState({ editing: useless });
    }

    handleModalSubmit = () => {
        let obj = this.state.editing;
        if (this.state.isNew)
            this.admin.postGroup(obj).then(() => {
                this.setState({ success: "Successfully added new group", editing: null });
                this.reloadFromApi();
            }).catch((error) => {
                this.setState({ apiError: this.api.translateErrorMessage(error), editing: null });
            });
        else
            this.admin.patchGroup(obj.id, obj).then(() => {
                this.setState({ success: "Successfully updated existing group", editing: null });
                this.reloadFromApi();
            }).catch((error) => {
                this.setState({ apiError: this.api.translateErrorMessage(error), editing: null });
            });
    }

    handleDelete = () => {
        this.admin.deleteGroup(this.state.deleteId).then(() => {
            this.setState({ success: "Successfully deleted group " + this.state.showConfirmModal, showConfirmModal: null, deleteId: null });
            this.reloadFromApi();
        }).catch((error) => {
            this.setState({ apiError: this.api.translateErrorMessage(error), showConfirmModal: null, deleteId: null });
        });
    }

    renderEditModal() {
        return (
            <>
                <Dialog open={this.state.editing ? true : false} onClose={() => this.setState({ editing: null })} maxWidth="sm" fullWidth>
                    {
                        this.state.isNew ?
                            <DialogTitle>New group</DialogTitle>
                            :
                            <DialogTitle>Edit group {this.state.editing.name}</DialogTitle>
                    }
                    <DialogContent>
                        <TextField
                            label="Group name"
                            placeholder="Group name"
                            value={this.state.editing.name}
                            onChange={this.handleGroupNameChange}
                        />
                        <List>
                            {
                                this.state.editing.permissions.map((perm, id) =>
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
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleModalSubmit}>{this.state.isNew ? "New" : "Update"}</Button>
                        <Button variant="contained" color="secondary" onClick={() => this.setState({ editing: null })}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

    renderConfirmModal() {
        return (
            <Dialog open={this.state.showConfirmModal ? true : false} onClose={() => this.setState({ showConfirmModal: null })}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure to delete group {this.state.showConfirmModal}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleDelete}>Delete</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.setState({ showConfirmModal: null })}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (
            <>
                <h2>
                    Manage Groups&nbsp;&nbsp;
                    <IconButton onClick={this.openNewModal} aria-label="add">
                        <AddIcon />
                    </IconButton>
                </h2>
                {
                    this.state.groups.map(grp =>
                        <Card key={grp.id} style={{ marginBottom: "16px" }}>
                            <CardContent>
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
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button onClick={() => this.openEditModal(grp)} size="small"><EditIcon /> Edit</Button>
                                <Button onClick={() => this.setState({ showConfirmModal: grp.name, deleteId: grp.id })} size="small"><DeleteIcon /> Delete</Button>
                            </CardActions>
                        </Card>
                    )
                }
                {this.state.editing && this.renderEditModal()}
                {this.state.showConfirmModal && this.renderConfirmModal()}
                {this.state.success && <Alert severity="success">{this.state.success}</Alert>}
                {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
            </>
        );
    }

}