import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";

class EditModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            Snackbaropen :false,
            Snackbarmsg:'',
            old_rate_public:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose =(e) =>{
        this.setState({
          Snackbaropen:false
        });
      }

      handleSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:5000/modify_evaluation_public/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email_person:event.target.email_person.value,
                old_rate_public:event.target.old_rate_public.value,
                new_rate_public:event.target.new_rate_public.value,
                number_rate:event.target.number_rate.value,
                note_rate:event.target.note_rate.value,
                email_employee:event.target.email_employee.value,
            })
        })
        .then(res =>res.json())
        .then((result) => {
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Updated successfully'
            });
        },
        (error)=>{
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Failed'
            });
        })
    }
    render(){
        return(
        <>
            <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.Snackbaropen}
                autoHideDuration={3000}
                onClose={this.SnackbarClose}
                message ={<span id="massage-id">{this.state.Snackbarmsg}</span>}
                action={[
                    <IconButton 
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.SnackbarClose}
                    >
                    x
                    </IconButton>
                ]}
            /> 
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Modify Evaluation Public
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId = "old_rate_public">
                                    <Form.Label>Old Rate Public</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="old_rate_public"
                                        required
                                        defaultValue = {this.props.old_rate_public}
                                        placeholder="%"
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group controlId = "new_rate_public">
                                    <Form.Label>New Rate Public</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="new_rate_public"
                                        required
                                        placeholder="%"
                                        onChange={(e) => this.setState({ new_rate_public: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "email_person">
                                    <Form.Label>Email Applicant</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email_person"
                                        required
                                        defaultValue = {this.props.email_person}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "number_rate">
                                    <Form.Label>Number Rate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="number_rate"
                                        required
                                        defaultValue = {this.props.number_rate}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "note_rate">
                                    <Form.Label>Note Rate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="note_rate"
                                        required
                                        defaultValue = {this.props.note_rate}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "email_employee">
                                    <Form.Label>Email Employee</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email_employee"
                                        required
                                        defaultValue = {this.props.email_employee}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Public Rate
                                    </Button>
                                </Form.Group>
                            </Form>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

export default EditModal;