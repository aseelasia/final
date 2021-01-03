import React from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";
import EditModal from './EditModal';

import {
  Card,
  CardBody,
  ButtonToolbar,
} from "reactstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      Snackbaropen :false,
      Snackbarmsg:'',
      selectedOption: "",
      email: "",
      password: "",
      getEmail:"",
      getName:"",
      getLevel:"",
      message:"",
      editModalShow:false,
      Snackbaropen :false,
      Snackbarmsg:'',

    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  SnackbarClose =(event) =>{
    this.setState({
      Snackbaropen:false
    });
  }
  
 validateForm() { 
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.selectedOption.length > 0;
  } 

  handleOptionChange = e => {
    this.setState({ selectedOption: e.target.value });
  };
    
  handleSubmit(event){
    event.preventDefault();
    if(this.state.selectedOption == "employee"){
      window.open("http://localhost:3000/admin/dashboard")
      fetch('http://127.0.0.1:5000/login_employee/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email_employee:event.target.email.value,
          password_employee:event.target.password.value,
        })
    })
    .then(res =>res.json())
    .then(data => {
      this.setState({
      message:data.message, 
      getEmail:data.email_employee,
      getLevel:data.level_employee,
      getName:data.username_employee,        
      })

    }
    )
    .then((result) => {
     if(this.state.message == "login successfully"){ 
      this.setState({
          Snackbaropen:true,
          Snackbarmsg:'login successfully'
      });
      window.open("http://localhost:3000/admin/dashboard")
    }
    else{
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'login failed'
        });
    }
  })
    }
    else if(this.state.selectedOption == "client"){
      window.open("http://localhost:3000/admin/dashboard")
      fetch('http://127.0.0.1:5000/login_client/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          company_email_client:event.target.email.value,
          password_client:event.target.password.value,
        })
    })
    .then(res =>res.json())
    .then(data => {
      this.setState({ 
      getEmail:data.company_email_client,
      getName:data.name_client,
      message:data.message,        
      })
    }
    )
    .then((result) => {
      if(this.state.message == "login successfully"){ 
       this.setState({
           Snackbaropen:true,
           Snackbarmsg:'login successfully'
       });
       
     }
     else{
         this.setState({
             Snackbaropen:true,
             Snackbarmsg:'login failed'
         });
     }
   })
    }
    else if(this.state.selectedOption == "applicant"){
      window.open("http://localhost:3001/profile")
      fetch('http://127.0.0.1:5000/login_person/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email_person:event.target.email.value,
          password_person:event.target.password.value,
        })
    })
    .then(res =>res.json())
    .then(data =>{
      this.setState({
      getEmail:data.email_person,
      getName:data.name_person,
      message:data.message,
      })
    })
    .then((result) => {
      if(this.state.message == "login successfully"){ 
       this.setState({
           Snackbaropen:true,
           Snackbarmsg:'login successfully'
       });
     }
     else{
         this.setState({
             Snackbaropen:true,
             Snackbarmsg:'login failed'
         });
     }
   })
  }
}

  render() {
    let editModalClose=()=> this.setState({editModalShow:false});
    const { email , selectedOption} = this.state;
    return (
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
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="email" className="text-muted">
                  <Form.Label column sm={3}>Email</Form.Label>
                  <Col sm={10} >
                    <Form.Control type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })}/>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password" className="text-muted">
                  <Form.Label column sm={4}>Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })}/>
                  </Col>
                </Form.Group>
                <fieldset>
                  <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={5}>As a :</Form.Label>
                      <Col sm={{ span: 6, offset: 2 }} className="text-muted">
                        <Form.Check
                          type="radio"
                          label="employee"
                          name="Radios"
                          id="employee"
                          value="employee"
                          checked={this.state.selectedOption === "employee"}
                          onChange={this.handleOptionChange}
                        />
                        <Form.Check
                          type="radio"
                          label="client"
                          name="Radios"
                          id="client"
                          value="client"
                          checked={this.state.selectedOption === "client"}
                          onChange={this.handleOptionChange}
                        />
                        <Form.Check
                          type="radio"
                          label="applicant"
                          name="Radios"
                          id="applicant"
                          value="applicant"
                          checked={this.state.selectedOption === "applicant"}
                          onChange={this.handleOptionChange}
                        />
                      </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="text-center">
                  <Col>
                    <Button type="submit" disabled={!this.validateForm()}>Sign in</Button>
                  </Col>
                </Form.Group>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
            <ButtonToolbar>
              <a
                className="text-light"
                href="#pablo"
                onClick={(event) => this.setState({
                  editModalShow:true,
                  email : this.state.email,
                  selectedOption : this.state.selectedOption
                })}
              >
                <small>Forgot password?</small>
              </a>       
              <EditModal 
              show = {this.state.editModalShow}
              onHide={editModalClose}
              email = {email}
              selectedOption= {selectedOption}
              />       
            </ButtonToolbar>

            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
