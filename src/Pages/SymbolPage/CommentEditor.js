import Button from "react-bootstrap/Button";
import SendIcon from "@material-ui/icons/Send";
import {Link} from "react-router-dom";
import React, {Component} from "react";

export default class CommentEditor extends Component {
    state  = {
        comment: ""
    }

    handleSubmitComment = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.comment, this.props.example);
        this.setState({comment: ""});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitComment}>
                {
                    this.props.user ?
                        <div className="symbol-page-new-comment">
                            <input type="text" placeholder="Add a comment..." value={this.state.comment} onChange={(event) => this.setState({comment: event.target.value})} />
                            {
                                this.state.comment.length !== 0 ?
                                    <Button variant="outline-success" type="submit"><SendIcon /></Button>
                                    :
                                    <Button disabled className="symbol-page-new-comment-disabled"><SendIcon /></Button>
                        }
                        </div>
                        :
                        <div className="symbol-page-connect">
                            <Link to='/login'>You should login to post comments</Link>
                        </div>
                }
            </form>
        );
    }
}
