import React, { Component } from 'react';
import { AdminService } from '../../../ApiService';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ManageCRUD from './ManageCRUD';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { fixedParseInt } from '../../../util';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

const FLAGS = [
    {
        Value: 0x10,
        Name: "Registration"
    },
    {
        Value: 0x20,
        Name: "Authentication"
    },
    {
        Value: 0x40,
        Name: "Standard"
    },
    {
        Value: 0x80,
        Name: "AuthApp"
    },
    {
        Value: 0x100,
        Name: "SelfDestruct"
    }
];

const FLAGS_MAP = {
    Registration: 0x10,
    Authentication: 0x20,
    Standard: 0x40,
    AuthApp: 0x80,
    SelfDestruct: 0x100
};

function apiKeyBitFieldToList(flags) {
    let lst = [];

    FLAGS.forEach(e => {
        if (flags & e.Value) {
            lst.push(e.Name);
        }
    });
    return (lst);
}

function apiKeyFlagListToBitField(names) {
    let bitfield = 0;

    names.forEach(v => {
        bitfield |= FLAGS_MAP[v];
    });
    return (bitfield);
}

function apiKeyBitFieldToString(flags) {
    let str = "";

    FLAGS.forEach(e => {
        if (flags & e.Value) {
            str += ", " + e.Name;
        }
    });
    return (str.substring(2));
}

export default class ManageApiKeys extends Component {

    state = {
        editing: null,
    };

    admin = new AdminService();

    handleDescriptionChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.description = ev.target.value;
        this.setState({ editing: useless });
    }

    handleOriginChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.origin = ev.target.value;
        this.setState({ editing: useless });
    }

    handleExpirationDateChange = (val) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.expirationDate = val;
        this.setState({ editing: useless });
    }

    handleUseNumChange = (ev) => {
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.useNum = ev.target.value;
        this.setState({ editing: useless });
    }

    openObjectModal = (obj) => {
        if (obj) {
            this.setState({ editing: obj });
        } else {
            this.setState({
                editing: {
                    description: "",
                    origin: "",
                    useNum: 0,
                    flags: 0,
                    expirationDate: null
                }
            });
        }
    }

    isDateInfinite(date) {
        return (new Date(date).getFullYear() === 9999);
    }

    handleSwitchDateInfinite = (ev) => {
        let dateStr = ""
        if (ev.target.checked) {
            dateStr = "9999-12-31T23:59:59.9999999";
        } else {
            dateStr = new Date().toString();
        }
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.expirationDate = dateStr;
        this.setState({ editing: useless });
    }

    handleBitFieldFlagsChange = (ev) => {
        let bits = apiKeyFlagListToBitField(ev.target.value);
        let useless = this.state.editing; //Required to workarround annoying react warning
        useless.flags = bits;
        this.setState({ editing: useless });
    }

    renderObjectModal = (obj) => {
        return (
            <Grid container direction="column">
                <TextField
                    label="Description"
                    placeholder="Description"
                    value={obj.description}
                    onChange={this.handleDescriptionChange}
                />
                <br />
                <TextField
                    label="Origin restriction"
                    placeholder="www.example.com"
                    value={obj.origin}
                    onChange={this.handleOriginChange}
                />
                <br />
                <TextField
                    label="Number of uses (-1 for infinity)"
                    inputProps={{ step: "1", min: "-1", max: "999999999999" }}
                    type="number"
                    value={obj.useNum}
                    onChange={this.handleUseNumChange}
                />
                <br />
                <FormControlLabel
                    control={
                        <Select
                            multiple
                            value={apiKeyBitFieldToList(obj.flags)}
                            onChange={this.handleBitFieldFlagsChange}
                            renderValue={(selected) =>
                                <>
                                    {
                                        selected.map((value) =>
                                            <Chip key={value} label={value} style={{ "fontWeight": 600 }} />
                                        )
                                    }
                                </>
                            }
                        >
                            {
                                FLAGS.map((f) =>
                                    <MenuItem key={f.Value} value={f.Name} style={obj.flags & f.Value ? { "fontWeight": 600 } : null}>
                                        {f.Name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    }
                    label="Flags: &nbsp;&nbsp;&nbsp;&nbsp;"
                    labelPlacement="start"
                />
                <br />
                <Grid container direction="row">
                    {
                        !this.isDateInfinite(obj.expirationDate) ?
                            <>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/DD/YYYY"
                                        margin="normal"
                                        label="Expiration date"
                                        value={obj.expirationDate}
                                        onChange={this.handleExpirationDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'Expiration date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </>
                            :
                            <>
                                <Typography color="textSecondary">
                                    Expiration date
                                    </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.isDateInfinite(obj.expirationDate)}
                                onChange={this.handleSwitchDateInfinite}
                                color="primary"
                            />
                        }
                        label="Infinite"
                    />
                </Grid>
            </Grid>
        );
    }

    renderObject = (apiKey) => {
        return (
            <>
                <Typography variant="h5" component="h2">
                    {apiKey.description}
                </Typography>
                <Typography color="textSecondary">
                    Key: {apiKey.id}
                </Typography>
                <Typography color="textSecondary">
                    Origin restriction: {(apiKey.origin === null || apiKey.origin === undefined) ? "None" : apiKey.origin}
                </Typography>
                <Typography color="textSecondary">
                    Remaining uses: {apiKey.useNum}
                </Typography>
                <Typography color="textSecondary">
                    Flags: {apiKeyBitFieldToString(apiKey.flags)}
                </Typography>
                <Typography color="textSecondary">
                    Expiration date: {(new Date(apiKey.expirationDate)).toLocaleDateString()}
                </Typography>
            </>
        );
    }

    postFunc = (obj) => {
        obj.useNum = fixedParseInt(obj.useNum);
        return (this.admin.postApiKey(obj));
    }

    patchFunc = (id, obj) => {
        obj.useNum = fixedParseInt(obj.useNum);
        return (this.admin.patchApiKey(id, obj));
    }

    render() {
        return (
            <>
                <ManageCRUD
                    // AXIOS
                    get={() => this.admin.getApiKeys()}
                    post={this.postFunc}
                    patch={this.patchFunc}
                    delete={(objid) => this.admin.deleteApiKey(objid)}

                    // Object
                    renderObject={this.renderObject}
                    getObjectName={(obj) => obj.description}
                    typeName="api key"

                    // Editor
                    openObjectModal={this.openObjectModal}
                    renderObjectModal={this.renderObjectModal}
                    editObject={this.state.editing}

                    //Global
                    managerName="Manage Api Keys"
                />
            </>
        );
    }

}