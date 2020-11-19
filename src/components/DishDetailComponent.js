import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSubmit(values) {
        console.log("Current state is " + JSON.stringify(values));
        alert("Current state is " + JSON.stringify(values));
    }


    render() {
        return (
            <div className="container">
                <Button outline onClick={this.toggleModal} color="primary">
                    <span></span>Add Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>

                            <Label htmlFor="rating">Rating</Label>
                            <Row className="form-group">

                                <Col>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Label htmlFor="name">Your Name</Label>
                            <Row className="form-group">

                                <Col>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Label htmlFor="comment" >Comment</Label>
                            <Row className="form-group">

                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit Comment</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

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
            <div>
            </div>
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
                    <CommentForm />
                </div>
            </div>

        </div>

    );
}


export default DishDetail;