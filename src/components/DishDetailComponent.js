import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';



function RenderComments({ comments }) {
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


function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="row">
                <div className="col-12 col-md-5 md-1">
                    <Card>
                        <CardImg top src={dish.image} />
                        <CardBody>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                            <CardText>
                                {dish.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 md-1">
                    <h4>Comments</h4>
                    <RenderComments comments={dish.comments} />

                </div>
            </div>


        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {

    return (
        <RenderDish dish={props.dish} />
    );
}


export default DishDetail;