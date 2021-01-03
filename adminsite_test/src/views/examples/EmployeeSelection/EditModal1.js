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
            new_employee_rate:''
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
        fetch('http://127.0.0.1:5000/modify_evaluation/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email_person:event.target.email_person.value,
                job_level:event.target.job_level.value,
                job_offer:event.target.job_offer.value,
                old_employee_rate:event.target.old_employee_rate.value,
                new_employee_rate:event.target.new_employee_rate.value,
                number_employee_rate:event.target.number_employee_rate.value,
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
                    Modify Evaluation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId = "old_employee_rate">
                                    <Form.Label>Old employee rate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="old_employee_rate"
                                        required
                                        defaultValue = {this.props.old_employee_rate}
                                        placeholder="%"
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group controlId = "new_employee_rate">
                                    <Form.Label>New employee rate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="new_employee_rate"
                                        required
                                        placeholder="%"
                                        onChange={(e) => this.setState({ new_employee_rate: e.target.value })}
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
                                <Form.Group controlId = "job_level">
                                    <Form.Label>Job Level</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="job_level"
                                        required
                                        defaultValue = {this.props.job_level}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "job_offer">
                                    <Form.Label>Job Offer</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="job_offer"
                                        required
                                        defaultValue = {this.props.job_offer}
                                        placeholder=""
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "number_employee_rate">
                                    <Form.Label>Number Employee Rate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="number_employee_rate"
                                        required
                                        defaultValue = {this.props.number_employee_rate}
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
                                        Edit Rate
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