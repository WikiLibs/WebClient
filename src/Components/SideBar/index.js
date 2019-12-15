import React, { Component } from 'react';
import ApiService from '../../ApiService';

import './index.css'

export default class SideBar extends Component {
    api = new ApiService();

    genLibList(lang) {
        var vals = []
         for (var lib in this.state[lang]) {
            var str = this.state[lang][lib].path;
            lib = str.split('/')[2];
            vals.push(<li key={str}>
                <a href={"/search/" + str}>{lib}</a>
            </li>);
        }
        return (vals);
    }

    genLangList() {
        var vals = []
        for (var lang in this.state) {
            vals.push(
                <li key={lang}>
                    <a href={"#" + lang} data-toggle="collapse" aria-expanded="false" className="fontRegular">{lang}</a>
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
                    <ul className="sidebar-nav">
                        <p className="title-sidebar-nav fontRegular">All Language</p>
                        {this.genLangList()}
                    </ul>
                </div>
            </div>
        )
    }

    async onLangsReceived(langs) {
        var tbl = {};
        for (var v in langs.data) {
            var libs = await this.api.getLibsPath(langs.data[v].name);
            tbl[langs.data[v].name] = libs.data.data;
            //console.log(libs.data.data)
            // console.log(langs.data[v].name, libs.data.data)
        }
        console.log(tbl)
        this.setState(tbl);
    }

    componentDidMount() {
        this.api.getLangs().then(langs => this.onLangsReceived(langs));
    }
}
