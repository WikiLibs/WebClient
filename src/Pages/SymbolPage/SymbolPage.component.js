import React, { Component } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import ApiService from '../../ApiService';

import './style.css';

export default class SymbolPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            date: null,
            lang: null,
            type: null,
            path: null,
            prototypes: [],
            symbols: []
        };
    }

    componentDidMount = () => {
        let sym = this.props.match.params.sympath;
        if (isNaN(sym))
            this.api.getSymbolByPath(sym).then(response => { this.setState(response.data); });
        else
            this.api.getSymbolById(sym).then(response => { this.setState(response.data); });
    }

    getName = () => {
        var str = this.state.path;
        if (str == null)
            return (null);
        var arr = str.split('/');
        if (arr.length <= 0)
            return (null);
        return (arr[arr.length - 1] + " (" + this.state.type + ")");
    }

    renderParameters = (proto) => {
        var vals = []

        for (var v in proto.parameters) {
            var param = proto.parameters[v];
            vals.push(
                <Row key={v}>
                    <Col xs="2" className="black"><span className='front'>{param.prototype}</span></Col>
                    <Col xs="6" className="black">{param.description}</Col>
                </Row>
            );
        }
        return (vals);
    }

    renderPrototypes = () => {
        var vals = []
        for (var v in this.state.prototypes) {
            var proto = this.state.prototypes[v]
            vals.push(
                <div key={v}>
                    <Container>
                        <h2 className='header2'>Prototype</h2>
                        <div className='paddingWell'>
                            <Card className="card-inverse paddingCard cardbackgroundcolor">
                                <Card.Body>
                                    <Card.Text className="black p-font">{proto.prototype}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                    <Container>
                        <h2 className='header2'>Description</h2>
                        <div className='paddingWell'>
                            <Card className="borderless">
                                <Card.Text className='black'>{proto.description}</Card.Text>
                            </Card>
                        </div>
                    </Container>
                    {
                        proto.parameters.length > 0 &&
                        <Container>
                            <h2 className='header2'>Parameters</h2>
                            <div className='paddingWell'>
                                <Card className="borderless">
                                    {this.renderParameters(proto)}
                                </Card>
                            </div>
                        </Container>
                    }
                </div>
            )
        }
        return (vals);
    }

    renderSymListInner = () => {
        var vals = []
        for (var v in this.state.symbols) {
            vals.push(
                <div key={v} className='paddingWell'>
                    <Card className="card-inverse paddingCard" style={{ backgroundColor: 'lightgray', borderColor: 'lightgrey' }}>
                        <Card.Body>
                            <Card.Text className="black">
                                <a href={"/symbol/" + this.state.symbols[v].id}><span className='func'>{this.state.symbols[v].path}</span></a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        return (vals);
    }

    renderSymList = () => {
        return (
            <Container>
                <h2 className='header2'>Members</h2>
                {this.renderSymListInner()}
            </Container>
        )
    }

    renderPrototypesOrSyms = () => {
        return (
            <div>
                {this.renderPrototypes()}
                {this.state.symbols.length > 0 && this.renderSymList()}
            </div>
        )
    }

    render = () => {
        return (
            <div>
                <Container>
                    <h1 className='header1'>{this.getName()}</h1>
                    <p className='minor'>({this.state.path})</p>
                </Container>
                {this.renderPrototypesOrSyms()}
            </div>
        )
    }
}
