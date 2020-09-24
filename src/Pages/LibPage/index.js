import React, { Component } from 'react';
import { useQuery } from '../../util';
import { ApiService } from '../../ApiService';

import Tree2 from 'react-tree-graph';

import Tree from 'react-animated-tree'

import "./style.css";

const treeStyles = {
    top: 40,
    left: 40,
    color: '#242424',
    fill: '#242424',
    width: '100%',
  }

export default class LibPage extends Component {
    api = new ApiService();

    state = {
        data: {},
        listType: [],
        libId: -1,
        libName: "",
        apiError: "",
        display: 0
      };
    
    onClick = (event, node) => {
        window.location = "/symbol?id=" + node.split("/%:/")[1];
    }

    setTree = () => {
        let final = [];
        let tmp = [];

        this.state.listType.forEach(elem => {
            this.state.data[elem].forEach(elem2 => {
                tmp.push({
                    name: elem2.firstPrototype + "/%:/" + elem2.id,
                    id: elem2.id
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

    setFolder = () => {
        let final = [];
        let tmp = [];

        this.state.listType.forEach(elem => {
            this.state.data[elem].forEach(elem2 => {
                tmp.push(
                    <Tree key={elem2.id} content={<button type="button" className="btn btn-link" onClick={() => {window.location = "/symbol?id=" + elem2.id}} >{elem2.firstPrototype}</button>} style={{ color: '#63b1de' }} />
                );
            });
            final.push(
                <Tree key={elem} content={elem}> {tmp} </Tree>
            );
            tmp = []
        });
        return(
                <Tree content={this.state.libName} type="ITEM"  open style={treeStyles}>
                    {final}
                </Tree>
        );
    }

    renderTree = () => {
        if (this.state.display === 0) {  
            return(
                <div className="custom-container">
                    {this.setFolder()}
                </div>
            );
        } else {
            let graphTree = this.setTree();
            return (
                <Tree2
	                    data={graphTree}
    	                height={2000}
	                    width={1700}
                        animated
                        duration={1200}
                        svgProps={{
                            className: 'custom'
                        }}
                        gProps={{
                            className: "node",
                            onClick: this.onClick,
                        }}
	                />
            );
        }
    }

    render = () => {
        if (this.state.apiError.length === 0) {
              return (
                <div className="custom-container">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" onClick={() => {this.setState({display: 0})}}>Folder</button>
                        <button type="button" className="btn btn-secondary" onClick={() => {this.setState({display: 1})}}>Graph</button>
                    </div>
                    {this.renderTree()}
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