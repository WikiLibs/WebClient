import React, { Component } from 'react';
import { useQuery } from '../../util';
import { ApiService } from '../../ApiService';
import TreeViewRoot from '../../Components/TreeViewRoot'

import CircularProgress from '@material-ui/core/CircularProgress';

import "./style.css";

export default class TreeView extends Component {
    api = new ApiService();

    state = {
        libId: 0,
        libName: '',
        data: [],
        isLoading: false
    }

    componentDidMount = async () => {
        var q = useQuery();
        let libId = parseInt(q.lib)
        let libName = q.name
        this.setState({
            libId: libId,
            libName: libName,
            isLoading: true
        })

        await this.api.getInfoTree(libId).then(result => {
            this.setState({
                data: this.getFormattedResponseWithTypes(result.data),
                isLoading: false
            })
        })
    }

    getFormattedResponseWithTypes = (response) => {
        let baseLibContents = []
        let tmpTypes = []

        response.forEach(elem => {
            tmpTypes.push(elem.type)
        })
        tmpTypes = [...new Set(tmpTypes)].sort()
        tmpTypes.forEach(type => {
            baseLibContents.push({
                id: type,
                name: type,
                subContent: []
            })
        })
        
        response.forEach(elem => {
            baseLibContents.forEach(typeContents => {
                if (typeContents.name === elem.type)
                    typeContents.subContent.push({
                        id: elem.id,
                        name: elem.firstPrototype,
                        subContent: null
                    })
            })
        })

        return baseLibContents
    }

    getElemToModify = (data, keyToGet, level) => {
        for (let i = 0 ; i < data.length ; i++) {
            if (data[i].name == keyToGet[level]) {
                if (level === keyToGet.length - 1)
                    return (data[i])
                return (this.getElemToModify(data[i].subContent, keyToGet, level + 1))
            }
        }
        return (null)
    }

    getSubContent = async (symId, nestedKey) => {
        let keyToGet = nestedKey.split('.')
        let elem = this.getElemToModify(this.state.data, keyToGet, 0)
        await this.api.getSymElements(this.state.libId, symId).then(result => {
            let subContent = this.getFormattedResponseWithTypes(result.data)
            elem.subContent = subContent
        })
    }

    render () {
        return (
            <div>
                <div >
                    <div>{this.state.libName.split("/").pop()} - Tree view</div>
                </div>
                <div >
                    {this.state.isLoading
                        ? <CircularProgress color="#7B68EE" />
                        : null
                    }
                    <TreeViewRoot data={this.state.data} getSubContent={this.getSubContent} {...this.props}/>
                </div>
            </div>
        )
    }
}