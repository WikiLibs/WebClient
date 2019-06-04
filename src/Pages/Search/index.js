import React, { Component } from 'react';
import ApiService from '../../ApiService';
import {Card, Button, Container } from 'react-bootstrap';

export default class Search extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    renderSymList() {
        var vals = []
        if (this.state == null || this.state.data.length <= 0)
            return (<h1 className='header1'>No results found</h1>);
        for (var v in this.state.data) {
            if (this.state.data[v].type === "attribute" || this.state.data[v].type === "member")
                continue;
            vals.push(
                <div key={v} className='paddingWell'>
                    <Card className="card-inverse paddingCard" style={{ backgroundColor: 'lightgray', borderColor: 'lightgrey' }}>
                        <Card.Body>
                            <Card.Text className="black">
                                <a href={"/symbol/" + this.state.data[v].id}><span className='func'>{this.state.data[v].path}</span></a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        return (vals);
    }

    handleNext() {
        ++this.page;
        this.refrehData();
    }

    handlePrev() {
        --this.page;
        this.refrehData();
    }

    renderFooter() {
        if (this.state == null || this.state.data.length <= 0)
            return;
        if (!this.state.hasMorePages && this.page > 1)
            return (
                <Button onClick={this.handlePrev}>Previous page</Button>
            );
        if (this.page > 1)
            return (
                <div>
                    <Button onClick={this.handlePrev}>Previous page</Button>
                    <Button onClick={this.handleNext}>Next page</Button>
                </div>
            );
        else
            return (<Button onClick={this.handleNext}>Next page</Button>);
    }

    render() {
        return (
            <Container>
                <h1 className='header1'>Results for '{this.props.match.params.path}'</h1>
                <p></p>
                {this.renderSymList()}
                {this.renderFooter()}
            </Container>
        );
    }

    refrehData() {
        this.api.searchSymbols(this.props.match.params.path, this.page).then(response => { this.setState(response.data); });
    }

    componentDidMount() {
        this.page = 1;
        this.refrehData();
    }
}
