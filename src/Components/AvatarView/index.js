import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import './index.css';

import at from './citybg.jpg';

export default class AvatarView extends Component {

    render() {
        let size = "40px";
        if (this.props.size === "small")
            size = "64px";
        else if (this.props.size === "medium")
            size = "128px";
        else if (this.props.size === "large")
            size = "256px";
        if (this.props.mutable) {
            return (
                <IconButton>
                    <Avatar style={{ width: size, height: size }} src={at} className="AvatarView" />
                </IconButton>
            );
        } else {
            return (
                <Avatar style={{ width: size, height: size }} src={at} className="AvatarView" />
            );
        }
    }

}