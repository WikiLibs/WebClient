import React, { Component } from 'react';
import { AdminService, ApiService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ManageCRUD from './ManageCRUD';
import Card from "@material-ui/core/Card";
import CreateIcon from "@material-ui/icons/Create";
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Row} from "react-bootstrap";

import pp from "../../../Components/Header/pp.png"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default class ManageSymbolLangs extends Component {

    state = {
        editing: null,
        loading: false,
        langPictures: {}
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
        this.api.getLangIcon(obj.id).then(response => {
            const pics = this.state.langPictures;
            pics[obj.id] = response;
            this.setState({langPictures: pics});
        });
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

    updateIcon(ev, id) {
        const pics = this.state.langPictures;
        pics[id] = URL.createObjectURL(ev.target.files[0]);
        this.setState({ loading: true, langPictures: pics });
        this.admin.setIconLang(id, ev.target.files[0]).then(() => this.setState({ loading: false }));
    }

    renderObjectModal = (obj) => {
        return (
            <>
                <Row>
                    <Col>
                        <Card style={{marginBottom: "32px"}} className="update-profile-profile-card">
                            <div>
                                <input type="file" id="file" name="file" className="update-profile-inputfile" onChange={(ev) => this.updateIcon(ev, obj.id)} />
                                <label htmlFor="file"><CreateIcon/></label>
                            </div>
                            <CardMedia
                                className="profile-pic"
                                image={(obj.id in this.state.langPictures) ? this.state.langPictures[obj.id] : pp}
                                title=""
                            />
                        </Card>
                    </Col>
                    <Col>
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
                    </Col>
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

    renderLoadingDialog() {
        return (
            <Dialog open={this.state.loading}>
                <DialogContent>
                    Uploading new image...
                </DialogContent>
            </Dialog>
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
                {this.renderLoadingDialog()}
            </>
        );
    }

}
