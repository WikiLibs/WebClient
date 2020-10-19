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
import UserInfoPopup from '../../../Components/UserInfoPopup';
import createDOMPurify from 'dompurify'
import Prism from 'prismjs';
import { Link } from 'react-router-dom';

const DOMPurify = createDOMPurify(window)

export default class ManageExampleRequests extends Component {

    state = {
        objects: [],
        viewData: false,
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
            <Dialog open={(this.state.current && !this.state.viewData) ? true : false} onClose={() => this.setState({ current: null })}>
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

    renderDataModal() {
        return (
            <Dialog className="admin-page-example-dialog" open={this.state.viewData} onClose={() => this.setState({ current: null, viewData: false })}>
                
                <div className="admin-page-example-title-container">
                        <div className="admin-page-example-title">View example data</div>
                        <span onClick={() => this.setState({ current: null, viewData: false })}><CloseIcon /></span>
                </div>
                <div className="admin-page-example-content-title">Raw example preview</div>
                <div className="admin-page-example-content">
                    <div className="admin-page-example-description">{this.state.current.data.description}</div>
                    <div className="admin-code-block">
                    {
                        this.state.current.data.code.map(elem => {
                            const html = Prism.highlight(elem.data + (elem.comment ? " // " + elem.comment : ""), Prism.languages.javascript, 'javascript');
                            return (
                                <span key={elem.data + elem.comment} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} /> 
                            );
                        })
                    }
                    </div>
                    <div className="admin-page-example-edit">Last modification: <b><UserInfoPopup userId={this.state.current.data.userId} /></b> - <b>{new Date(this.state.current.data.creationDate).toLocaleDateString()}</b></div>
                </div>
                <div className="admin-page-example-useful">
                    <div className="admin-page-example-info">Example ID: <span>{this.state.current.data.id}</span></div>
                    <div className="admin-page-example-info">Creation date: <span>{new Date(this.state.current.data.creationDate).toLocaleDateString()}</span></div>
                    <div className="admin-page-example-info">Pseudo: <span><UserInfoPopup userId={this.state.current.data.userId} /></span></div>
                </div>
                <a className="admin-page-example-link" target="_blank" rel="noopener noreferrer" href={"/symbol?id=" + this.state.current.data.symbolId}>View symbol page</a>
            </Dialog>
        );
    }

    getRequestType(type) {
        switch (type) {
            case 1:
                return "POST"
            case 2:
                return "PATCH"
            case 3:
                return "DELETE"
        }
    }

    viewExample(obj) {
        this.setState({current: obj, viewData: true});
    }

    renderObject = (obj) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {obj.message} {obj.data && <>(by: <UserInfoPopup userId={obj.data.userId} />)</>}
                </Typography>
                <Typography color="textSecondary">
                    Type of request: {this.getRequestType(obj.type)}
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
                                {this.renderObject(obj)}
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Button onClick={() => this.setState({ method: "accept", current: obj })} size="small"><CheckIcon /> Accept</Button>
                                <Button onClick={() => this.setState({ method: "reject", current: obj })} size="small"><CloseIcon /> Reject</Button>
                            </CardActions>
                        </Card>
                    )
                }
                {this.renderFooter()}
                {this.state.current && this.renderConfirmModal()}
                {this.state.current && this.renderDataModal()}
                {this.state.success && <Alert severity="success">{this.state.success}</Alert>}
                {this.state.apiError && <Alert severity="error">{this.state.apiError}</Alert>}
            </>
        );
    }

}