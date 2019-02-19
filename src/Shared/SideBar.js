import axios from 'axios'
import React, { Component } from 'react';

class SideBar extends Component {
    genLibList(lang) {
        var vals = []
        for (var lib in this.state[lang]) {
            var str = this.state[lang][lib];
            lib = str.split('/')[1];
            vals.push(<li key={lang + lib}>
                <a href="#SubmenuC_L">{lib}</a>
            </li>);
        }
        return (vals);
    }
    genLangList() {
        var vals = []
        for (var lang in this.state) {
            vals.push(
                <li key={lang}>
                    <a href="#SubmenuC_L" data-toggle="collapse" aria-expanded="false" className=" fontRegular">{lang}</a>
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
        var tbl = {}
        for (var v in langs.data) {
            var libs = await axios.get('/api/search/lang/' + langs.data[v], {
                'headers': {
                    'Authorization': '7ad19ee2-db3f-4d1f-95d1-58311c3caf11'
                }
            });
            tbl[langs.data[v]] = libs.data;
            this.setState(tbl);
        }
    }
    componentDidMount() {
        axios.get('/api/search/lang', {
            'headers': {
                'Authorization': '7ad19ee2-db3f-4d1f-95d1-58311c3caf11'
            }
        }).then(langs => this.onLangsReceived(langs));
    }
}

export default SideBar;
