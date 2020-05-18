import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Icons
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';
import FunctionsIcon from '@material-ui/icons/Functions';
import AppsIcon from '@material-ui/icons/Apps';

import './style.css';

//Components
import ManageGroups from './Components/ManageGroups';
import ManageApiKeys from './Components/ManageApiKeys';
import ManageApps from './Components/ManageApps';
import ManageSymbolLangs from './Components/ManageSymbolLangs';
import ManageSymbolTypes from './Components/ManageSymbolTypes';

const ComponentMap = {
    "Groups": ManageGroups,
    "ApiKeys": ManageApiKeys,
    "Bots": ManageApps,
    "SymbolTypes": ManageSymbolTypes,
    "SymbolLangs": ManageSymbolLangs
};

export default class AdminPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: "Groups"
        };
    }

    switchAdminComponent = (_, val) => {
        if (val == null)
            return; //Apparently MaterialUI ToggleButtonGroup does not properly handle exclusive changes
        this.setState({ component: val });
    }

    render() {
        if (!this.props.user) {
            return (<h1>403: You do not have permission to use this page</h1>);
        }
        let Comp = ComponentMap[this.state.component];
        return (
            <div id="Bodqwfihjjy">
                <div id="AdminActions">
                    <ToggleButtonGroup value={this.state.component} exclusive onChange={this.switchAdminComponent}>
                        {
                            this.props.user.hasPermission("group.list") &&
                            <ToggleButton value="Groups">
                                <GroupIcon />&nbsp;&nbsp;Manage Groups
                            </ToggleButton>
                        }
                        {
                            this.props.user.hasPermission("bot.list") &&
                            <ToggleButton value="Bots">
                                <AppsIcon />&nbsp;&nbsp;Manage Apps
                            </ToggleButton>
                        }
                        {
                            this.props.user.hasPermission("apikey.list") &&
                            <ToggleButton value="ApiKeys">
                                <LockIcon />&nbsp;&nbsp;Manage Api Keys
                            </ToggleButton>
                        }
                        <ToggleButton value="SymbolLangs">
                            <FunctionsIcon />&nbsp;&nbsp;Manage Programming Languages
                        </ToggleButton>
                        <ToggleButton value="SymbolTypes">
                            <FunctionsIcon />&nbsp;&nbsp;Manage Symbol Types
                        </ToggleButton>
                        {
                            this.props.user.hasPermission("example.requests.list") &&
                            <ToggleButton value="ExampleRequests">
                                <FunctionsIcon />&nbsp;&nbsp;Manage Example Requests
                            </ToggleButton>
                        }
                    </ToggleButtonGroup>
                </div>
                <div id="AdminContent">
                    {<Comp />}
                </div>
            </div>
        );
    }

}