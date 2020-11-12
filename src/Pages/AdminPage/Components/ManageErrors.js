import React, {Component} from "react";
import {AdminService} from "../../../ApiService";
import Typography from "@material-ui/core/Typography";
import ManageCRUD from "./ManageCRUD";
import {Button} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default class ManageErrors extends Component {
    state = {
        view: null
    };

    admin = new AdminService();

    renderViewDialog() {
        return (
            <Dialog open={this.state.view !== null} onClose={() => this.setState({view: null})}>
                <DialogTitle>{this.state.view.description}</DialogTitle>
                <DialogContent>
                    <pre>
                        {this.state.view.errorData}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({view: null})}><CloseIcon/> Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderObject = (obj) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {obj.description}
                </Typography>
                <Typography color="textSecondary">
                    {obj.errorMessage}
                </Typography>
                <Typography color="textSecondary">
                    {new Date(obj.date).toLocaleDateString()}
                </Typography>
                <Button onClick={() => this.setState({view: obj})}><VisibilityIcon/> View</Button>
            </>
        );
    }

    cleanup = () => {
        this.admin.deleteErrors().then(() => window.location.reload());
    }

    render() {
        return (
            <>
                <ManageCRUD
                    // AXIOS
                    get={() => this.admin.getErrors()}
                    delete={(objid) => this.admin.deleteError(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.description}
                    typeName="error"

                    //Global
                    managerName="Manage Error Reports"
                />
                <Button variant="contained" color="secondary" onClick={this.cleanup}><DeleteForeverIcon /> Cleanup</Button>
                {this.state.view && this.renderViewDialog()}
            </>
        );
    }
}