import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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

        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 md-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 md-1">
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} />
                </div>
            </div>

        </div>

    );
}


export default DishDetail;