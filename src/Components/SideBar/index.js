import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';

import './index.css'

export default class SideBar extends Component {
    api = new ApiService();

    genLibList(lang) {
        var vals = []
        this.state[lang].data.forEach(elem => {
            let str = elem.name.split('/')[1];
            vals.push(<li key={elem.id}>
                <a href={"/search?name=" + encodeURIComponent(this.state[lang].displayName + '/' + str) + "&lib=" + elem.id}>{str}</a>
            </li>);
        });
        return (vals);
    }

    genLangList() {
        var vals = []
        for (var lang in this.state) {
            vals.push(
                <li key={lang}>
                    <a href={"#" + lang} data-toggle="collapse" aria-expanded="false" className="sidebar-fontRegular">{this.state[lang].displayName}</a>
                    <ul className="collapse list-unstyled" id={lang}>
                        {this.genLibList(lang)}
                    </ul>
                </li>
            );
        }
        return (vals)
    }

    render() {
        return (
            <div className="SideBar">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav-home sidebar-nav">
                        <a className="title-sidebar-nav sidebar-fontRegular" href='/'><HomeIcon className="sidebar-icons"/>Home</a>
                    </ul>
                    <ul className="sidebar-nav">
                        <p className="title-sidebar-nav sidebar-fontRegular"><StarIcon className="sidebar-icons"/>All Language</p>
                        {this.genLangList()}
                    </ul>
                </div>
            </div>
        )
    }

    async onLangsReceived(langs) {
        var tbl = {};
        for (var v in langs.data) {
            var libs = await this.api.getLibs(langs.data[v].id);
            tbl[langs.data[v].name] = { displayName: langs.data[v].displayName, data: libs.data.data };
        }
        this.setState(tbl);
    }

    componentDidMount() {
        this.api.getSymLangs().then(langs => this.onLangsReceived(langs));
    }
}
