import React, { Component } from 'react';
import { useQuery } from '../../util';
import { ApiService } from '../../ApiService';

export default class LibPage extends Component {
api = new ApiService();

    state = {
        data: [],
        libId: -1
    };

    render = () => {
        let vals = []
        if (this.state.data) {
            this.state.data.forEach(elem => {
                vals.push(
                    <p key={elem.id} >{"ID: " + elem.id + ", Path: " + elem.path}</p>
                );
            })
        }
        return(
            <div>
                <h1>{"library ID:" + this.state.libId}</h1>
                <h2>{vals}</h2>
            </div>
        );
    }

    componentDidMount = async () => {
        var q = useQuery();
        let query = {
            page: 1,
            count: 10,
            lib: null,
            lang: null,
            type: null,
            path: null
        };
        query.lib = parseInt(q.lib);
        this.setState({libId:query.lib});
            
        this.api.searchSymbols(query).then(response => this.setState({data:response.data.data}))
    }
}