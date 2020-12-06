import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ListIcon from '@material-ui/icons/List';

import './index.css'

import CIcon from './imgs/c_icon.png'
import CPPIcon from './imgs/cpp_icon.png'
import JavaIcon from './imgs/java_icon.png'
import PythonIcon from './imgs/python_icon.png'

export default class SideBar extends Component {
    api = new ApiService();

    genLibList(lang) {
        var vals = []
        this.state[lang].data.forEach(elem => {
            let str = elem.name.split('/')[1];
            vals.push(<li key={elem.id}>
                <a href={"/libraries?name=" + encodeURIComponent(this.state[lang].displayName + '/' + str) + "&lib=" + elem.id}>{str}</a>
            </li>);
        });
        return (vals);
    }

    getIconByLangName(langName) {
        let icon = PythonIcon;
        switch (langName) {
            case "C":
                icon = CIcon;
                break;
            case "C++":
                icon = CPPIcon;
                break;
            case "Java":
                icon = JavaIcon;
                break;
            default:
                icon = PythonIcon;
                break;
        }
        return icon;
    }

    genLangbtn(lang) {
        return (
            <>
                <img src={this.getIconByLangName(this.state[lang].displayName)} alt={this.state[lang].displayName}/>
                <span>{this.state[lang].displayName}</span>
            </>
        )
    }

    genLangList() {
        var vals = []
        for (var lang in this.state) {
            vals.push(
                <li key={lang}>
                    <a href={"#" + lang} data-toggle="collapse" aria-expanded="false" className="sidebar-fontRegular">{this.genLangbtn(lang)}</a>
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
                        <a className="title-sidebar-nav sidebar-fontRegular" href='/'><HomeOutlinedIcon className="sidebar-icons"/><span>Home</span></a>
                    </ul>
                    <ul className="sidebar-nav">
                        <p className="title-sidebar-nav sidebar-fontRegular"><ListIcon className="sidebar-icons"/><span>All Language</span></p>
                        {this.genLangList()}
                    </ul>
                </div>
            </div>
        )
    }

    async onLangsReceived(langs) {
        var tbl = {};
        for (var v in langs.data) {
            var libs = await this.api.getLibs(langs.data[v].id).catch(err => {
                this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            });
            tbl[langs.data[v].name] = { displayName: langs.data[v].displayName, data: libs.data.data };
        }
        this.setState(tbl);
    }

    componentDidMount() {
        this.api.getSymLangs().then(langs => this.onLangsReceived(langs));
    }
}
