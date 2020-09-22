import React, { Component } from 'react';
import { useQuery } from '../../util';
import { ApiService } from '../../ApiService';

import Tree from 'react-tree-graph';

import "./style.css";

export default class LibPage extends Component {
    api = new ApiService();

    state = {
        data: {},
        listType: [],
        libId: -1,
        libName: "",
        apiError: ""
      };
    
    onClick = (event, nodeKey) => {
        alert(`Left clicked ${nodeKey}`);
    }

    setTree = () => {
        let final = [];
        let tmp = [];

        this.state.listType.forEach(elem => {
            this.state.data[elem].forEach(elem2 => {
                tmp.push({
                    name: elem2.firstPrototype
                });
            });
            final.push({name: elem, children: tmp})
            tmp = []
        });
        return(
            {
                name: this.state.libName,
                children: final
            }
        );
    }

    render = () => {
        if (this.state.apiError.length === 0) {
            let tree = this.setTree();
             
              return (
                <div className="custom-container">
                    <Tree
	                    data={tree}
    	                height={2000}
	                    width={1700}
                        animated
                        duration={1200}
                        svgProps={{
                            className: 'custom'
                        }}
                        gProps={{
                            onClick: this.onClick,
                        }}
	                />
                </div>
              )
        } else {
            return (<div>{this.state.apiError}</div>)
        }
    }

    componentDidMount = async () => {
        var q = useQuery();
        let apiError = "";
        let rep = await this.api.getInfoTree(parseInt(q.lib)).catch(err => apiError = this.api.translateErrorMessage(err));
        let listData = {};
        let listType = [];

        if (apiError.length === 0) {
            rep.data.forEach(elem => {
                if (!listData[elem.type]) {
                    listData[elem.type] = [];
                    listType.push(elem.type);
                }
                listData[elem.type].push(elem);
            });

            this.setState({
                data: listData, 
                listType: listType, 
                libId: parseInt(q.lib), 
                libName: q.name
            });
        } else {
            this.setState({apiError: apiError});
        }
    };
}