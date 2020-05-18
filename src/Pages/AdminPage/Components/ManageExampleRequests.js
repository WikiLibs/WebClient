import React, { Component } from 'react';
import { AdminService, ApiService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Alert from '@material-ui/lab/Alert';
import { DialogContentText } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export default class ManageExampleRequests extends Component {

    state = {
        objects: [],
        hasMorePages: false,
        apiError: null,
        success: null,
        method: "accept",
        current: null,
        page: 1
    };

    admin = new AdminService();
    api = new ApiService();

    reloadFromApi() {
        this.admin.getExampleRequests(this.state.page).then(response => {
            this.setState({ objects: response.data.data, hasMorePages: response.data.hasMorePages });
        }).catch(err => {
            this.setState({ apiError: this.api.translateErrorMessage(err) });
        });
    }

    handleNext = () => {
        this.setState({ objects: [], 'page': this.state.page + 1 }, () => this.reloadFromApi());
    }

    handlePrev = () => {
        this.setState({ objects: [], 'page': this.state.page - 1 }, () => this.reloadFromApi());
    }

    componentDidMount() {
        this.reloadFromApi();
    }

    handleApply = () => {
        let obj = this.state.current;
        if (this.state.method === "accept") {
            this.admin.acceptExampleRequest(obj.id).then(_ => {
                this.setState({ success: "Successfully applied " + obj.message, current: null });
                this.reloadFromApi();
            }).catch(err => {
                this.setState({ apiError: this.api.translateErrorMessage(err), current: null });
            });
        } else {
            this.admin.deleteExampleRequest(obj.id).then(_ => {
                this.setState({ success: "Successfully deleted " + obj.message, current: null });
                this.reloadFromApi();
            }).catch(err => {
                this.setState({ apiError: this.api.translateErrorMessage(err), current: null });
            });
        }
    }

    renderConfirmModal() {
        return (
            <Dialog open={this.state.current ? true : false} onClose={() => this.setState({ current: null })}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure to {this.state.method} {this.state.current.message}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleApply}>Yes</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.setState({ current: null })}>No</Button>
                </DialogActions>
            </Dialog>
        );
    }

    viewExample(obj) {
        window.open("/symbol?id=" + obj.symbolId, '_blank');
    }

    renderObject = (obj) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {obj.message}
                </Typography>
                <Typography color="textSecondary">
                    Identifier: {obj.id}
                </Typography>
                <Button onClick={() => this.viewExample(obj)} size="small"><VisibilityIcon /> View</Button>
            </>
        );
    }

    renderFooter = () => {
        if (this.state.objects.length === 0 || (!this.state.hasMorePages && this.state.page === 1))
            return;
        if (!this.state.hasMorePages && this.state.page > 1)
            return (
                <Button variant="contained" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                    Previous page
                </Button>
            )
        if (this.state.page > 1)
            return (
                <div>
                    <Button variant="contained" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                        Previous page
                    </Button>
                    <Button variant="contained" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                        Next page
                    </Button>
                </div>
            )
        else
            return (
                <Button variant="contained" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                    Next page
                </Button>
            )
    }

    render() {
        return (
            <>
                <h2>
                    Manage Example Requests
                </h2>
                {
                    this.state.objects.map(obj =>
                        <Card key={obj.id} style={{ marginBottom: "16px" }}>
                            <CardContent>
                                {this.props.renderObject(obj)}
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button onClick={() => this.setState({ method: "accept", current: obj })} size="small"><CheckIcon /> Accept</Button>
                                <Button onClick={() => this.setState({ method: "reject", current: obj })} size="small"><CloseIcon /> Rject</Button>
                            </CardActions>
                        </Card>
                    )
                }
                {this.renderFooter()}
                {this.state.current && this.renderConfirmModal()}
                {this.state.success && <Alert severity="success">{this.state.success}</Alert>}
                {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
            </>
        );
    }

}