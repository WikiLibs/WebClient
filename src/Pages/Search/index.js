import axios from 'axios';
import React, { Component } from 'react';

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
                    <div className="card card-inverse paddingCard" style={{ backgroundColor: 'lightgray', borderColor: 'lightgrey' }}>
                        <div className="card-block">
                            <a href={"/symbol/" + this.state.results[v]}><p className="card-text black"><span className='func'>{this.state.results[v]}</span></p></a>
                        </div>
                    </div>
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
                <button onClick={this.handlePrev} type="button" className="btn btn-primary">Previous page</button>
            );
        if (this.page > 0)
            return (
                <div>
                    <button onClick={this.handlePrev} type="button" className="btn btn-primary">Previous page</button>
                    <button onClick={this.handleNext} type="button" className="btn btn-primary">Next page</button>
                </div>
            );
        else
            return (<button onClick={this.handleNext} type="button" className="btn btn-primary">Next page</button>);
    }
    render() {
        return (
            <div className='container'>
                <h1 className='header1'>Results for '{this.props.match.params.path}'</h1>
                <p></p>
                {this.renderSymList()}
                {this.renderFooter()}
            </div>
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
