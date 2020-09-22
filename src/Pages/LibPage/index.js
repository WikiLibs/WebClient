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
        libName: ""
      };
    
    onClick = (event, nodeKey) => {
        alert(`Left clicked ${nodeKey}`);
    }

    setTree = () => {

        return(
            {
                name: this.state.libName,
                children: []
            }
        );
    }

    render = () => {
        let tree = this.setTree();
        return (
            <div className="custom-container">
                <Tree
	                data={tree}
	                height={200}
	                width={400}
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
        );
    }

    componentDidMount = async () => {
        var q = useQuery();        
        let listData = {};
        let listType = [];

        this.api.getInfoTree(parseInt(q.lib)).then(response => {
            response.data.forEach(elem => {
                if (!listData[elem.type]) {
                    listData[elem.type] = [];
                    listType.push(elem.type);
                }
                listData[elem.type].push(elem);
            })
        });
        console.log(listData);
        this.setState({data: listData, listType: listType, libId: parseInt(q.lib), libName: q.name});
    };
}