import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


class DishDetail extends Component {


    renderComments(comments) {
        if (comments != null) {
            return comments.map((comment) => {
                let date = new Date(comment.date);
                return (
                    <div>
                        <ul className="list-unstyled">
                            <li>-- {comment.comment}</li>
                            <li>{comment.author}, {date.getDate()}, {date.getFullYear()}</li>
                        </ul>
                    </div>
                )
            });
        } else {
            return (
                <div></div>
            );
        }
    }


    renderDish() {
        if (this.props.dish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 md-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} />
                            <CardBody>
                                <CardTitle>
                                    {this.props.dish.name}
                                </CardTitle>
                                <CardText>
                                    {this.props.dish.description}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 md-1">
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>


            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {

        return (
            this.renderDish(this.props.dish)
        );
    }
}

export default DishDetail;