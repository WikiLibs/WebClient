import axios from 'axios';
import React, { Component } from 'react';
import {Card, Button, Container } from 'react-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }
    renderSymList() {
        var vals = []
        if (this.state == null || this.state.results.length <= 0)
            return (<h1 className='header1'>No results found</h1>);
        for (var v in this.state.results) {
            vals.push(
                <div key={v} className='paddingWell'>
                    <Card className="card-inverse paddingCard" style={{ backgroundColor: 'lightgray', borderColor: 'lightgrey' }}>
                        <Card.Body>
                            <Card.Text className="black">
                                <a href={"/symbol/" + this.state.results[v]}><span className='func'>{this.state.results[v]}</span></a>
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
        if (this.state == null || this.state.results.length <= 0)
            return;
        if (!this.state.next && this.page > 0)
            return (
                <Button onClick={this.handlePrev}>Previous page</Button>
            );
        if (this.page > 0)
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
        axios.get('/api/search/string/' + this.page + '/' + this.props.match.params.path, {
            'headers': {
                'Authorization': '7ad19ee2-db3f-4d1f-95d1-58311c3caf11'
            }
        }).then(response => { this.setState(response.data); });
    }
    componentDidMount() {
        this.page = 0;
        this.refrehData();
    }
}

export default Search;
