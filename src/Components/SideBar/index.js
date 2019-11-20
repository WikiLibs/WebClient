import React, { Component } from 'react';
import ApiService from '../../ApiService';

import './index.css'

export default class SideBar extends Component {
    api = new ApiService();

    genLibList(lang) {
        var vals = []
         for (var lib in this.state[lang]) {
             //console.log(this.state[lang][lib])
            var str = this.state[lang][lib];
            if (lang.lenght !== 0) {
                lib = str.split('/')[1];
            }
            vals.push(<li key={lang + lib}>
                <a href={"/search/" + lang + "/" + lib}>{lib}</a>
            </li>);
        }
        return (vals);
    }

    genLangList() {
        var vals = []
        for (var lang in this.state) {
            vals.push(
                <li key={lang}>
                    <a href="#SubmenuC_L" data-toggle="collapse" aria-expanded="false" className="fontRegular">{lang}</a>
                    <ul className="collapse list-unstyled" id="SubmenuC_L">
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
            var libs = await this.api.getLibs(v+1);
            tbl[langs.data[v].name] = libs.data.data;
        }
        console.log(tbl)
        this.setState(tbl);
    }

    componentDidMount() {
        this.api.getLangs().then(langs => this.onLangsReceived(langs));
    }
}
