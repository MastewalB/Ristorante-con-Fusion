import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';





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
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                                    <Control.text model=".author" id="author" name="author"
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

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const com = comments.map((comment) => {
            let date = new Date(comment.date);
            return (

                <div>
                    <ul className="list-unstyled">
                        <Stagger in>

                            <li>-- {comment.comment}</li>
                            <li><Fade in>
                                {comment.author},     {new Intl.DateTimeFormat('en-us',
                                    { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(comment.date))}
                            </Fade></li>
                        </Stagger>
                    </ul>
                </div>
            )
        });
        return (
            <div className="col-12">
                <h4>Comments</h4>
                {com}
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
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
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} />
                        <CardBody>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                            <CardText>
                                {dish.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>

        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
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
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />

                </div>
            </div>

        </div>

    );
}


export default DishDetail;