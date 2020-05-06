import React, { Component } from 'react';
import { ApiService } from '../../../ApiService';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { DialogContentText } from '@material-ui/core';

/**
 * WARNING: To use this class makre sure your object is JSON serialized, contains an "id" property and can be posted/patched and retrieved by AXIOS promises
 * Props:
 *      get(): returns an AXIOS promise producing a response.data containing a JSON array of all JSON objects to draw
 *      post(obj): returns an AXIOS promise that should create the new object passed as parameter
 *      patch(obj id, obj): returns an AXIOS promise that should update the object obj with id "obj id"
 *      delete(obj id): returns an AXIOS promise that should delete the object with id "obj id"
 *      renderObject(obj): draws a single object
 *      renderObjectModal(obj): draws the edit modal for object obj
 *      openObjectModal(obj): called the object modal is requested for object obj
 *      managerName: string title of the page
 *      getObjectName(obj): returns a string corresponding to the name of the object to use for display
 *      typeName: string name of the type of object this manager is supposed to manage used to generate the modals base content
 *      editObject: this is the object to hold content updates when editing an object
 */

export default class ManageCRUD extends Component {

    state = {
        objects: [],
        showEditModal: false,
        isNew: false,
        apiError: null,
        success: null,
        showConfirmModal: null,
        deleteId: null
    };

    initialized = false;

    api = new ApiService();

    callEvent(name, ...args) {
        if (this.props.events && this.props.events[name])
            this.props.events[name](...args);
    }

    reloadFromApi() {
        this.props.get().then(response => {
            this.setState({ objects: response.data });
            if (!this.initialized) {
                this.initialized = true;
                this.callEvent("postLoad", response.data);
            }
        }).catch((error) => {
            this.setState({ apiError: this.api.translateErrorMessage(error) });
        });
    }

    componentDidMount() {
        this.callEvent("preLoad");
        this.reloadFromApi();
    }

    openEditModal(obj) {
        let copy = JSON.parse(JSON.stringify(obj)); //Make a copy of the object data before starting to modify
        this.setState({ isNew: false, showEditModal: true });
        this.props.openObjectModal(copy)
    }

    openNewModal = () => {
        this.setState({
            isNew: true,
            showEditModal: true
        });
        this.props.openObjectModal(null)
    }

    handleModalSubmit = () => {
        let obj = this.props.editObject;
        if (this.state.isNew) {
            this.callEvent("preObjectCreate", obj);
            this.props.post(obj).then((response) => {
                this.setState({ success: "Successfully added new " + this.props.typeName, showEditModal: false });
                this.reloadFromApi();
                this.callEvent("postObjectCreate", response.data);
            }).catch((error) => {
                this.setState({ apiError: this.api.translateErrorMessage(error), showEditModal: false });
            });
        } else {
            this.callEvent("preObjectUpdate", obj);
            this.props.patch(obj.id, obj).then((response) => {
                this.setState({ success: "Successfully updated existing " + this.props.typeName, showEditModal: false });
                this.reloadFromApi();
                this.callEvent("postObjectUpdate", response.data);
            }).catch((error) => {
                this.setState({ apiError: this.api.translateErrorMessage(error), showEditModal: false });
            });
        }
    }

    handleDelete = () => {
        this.props.delete(this.state.deleteId).then(() => {
            this.setState({ success: "Successfully deleted " + this.props.typeName + " " + this.state.showConfirmModal, showConfirmModal: null, deleteId: null });
            this.reloadFromApi();
        }).catch((error) => {
            this.setState({ apiError: this.api.translateErrorMessage(error), showConfirmModal: null, deleteId: null });
        });
    }

    renderEditModal() {
        return (
            <>
                <Dialog open={this.state.showEditModal} onClose={() => this.setState({ showEditModal: false })} maxWidth="sm" fullWidth>
                    {
                        this.state.isNew ?
                            <DialogTitle>New {this.props.typeName}</DialogTitle>
                            :
                            <DialogTitle>Edit {this.props.typeName} {this.props.getObjectName(this.props.editObject)}</DialogTitle>
                    }
                    <DialogContent>
                        {this.props.renderObjectModal(this.props.editObject)}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleModalSubmit}>{this.state.isNew ? "New" : "Update"}</Button>
                        <Button variant="contained" color="secondary" onClick={() => this.setState({ showEditModal: false })}>Cancel</Button>
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
                    <DialogContentText>Are you sure to delete {this.props.typeName} {this.state.showConfirmModal}?</DialogContentText>
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
                    {this.props.managerName}&nbsp;&nbsp;
                    <IconButton onClick={this.openNewModal} aria-label="add">
                        <AddIcon />
                    </IconButton>
                </h2>
                {
                    this.state.objects.map(obj =>
                        <Card key={obj.id} style={{ marginBottom: "16px" }}>
                            <CardContent>
                                {this.props.renderObject(obj)}
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button onClick={() => this.openEditModal(obj)} size="small"><EditIcon /> Edit</Button>
                                <Button onClick={() => this.setState({ showConfirmModal: this.props.getObjectName(obj), deleteId: obj.id })} size="small"><DeleteIcon /> Delete</Button>
                            </CardActions>
                        </Card>
                    )
                }
                {this.state.showEditModal && this.renderEditModal()}
                {this.state.showConfirmModal && this.renderConfirmModal()}
                {this.state.success && <Alert severity="success">{this.state.success}</Alert>}
                {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
            </>
        );
    }

}