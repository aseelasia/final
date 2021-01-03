import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";

class AddSkillModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            Snackbaropen :false,
            Snackbarmsg:'',
            value:'',
            category:'',
            jobOffer:[],
            Category:[], 
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose =(e) =>{
        this.setState({
          Snackbaropen:false
        });
    }

    handleChange1(event) {
        this.setState({category: event.target.value});
    }
    handleChange2(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:5000/add_job_category_skill/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                job_category_name:this.state.category,
                job_category_name_skill:this.state.value,
            })
        })
        .then(res =>res.json())
        .then((result) => {
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'added successfully'
            });
        },
        (error)=>{
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Failed'
            });
        })
    }

    componentWillMount(){
        this.getJobLevel();
        this.getCatagory();
      }
    
      getJobLevel() {
        fetch('http://127.0.0.1:5000/search_job_offer/')
        .then(response => response.json())
        .then(data => {
          this.setState({
            jobOffer :data,
          });
        });
      }

      getCatagory() {
        fetch('http://127.0.0.1:5000/search_job_category/')
        .then(response => response.json())
        .then(data => {
          this.setState({
            Category :data,
          });
        });
      }

    render(){
        const {jobOffer,Category} = this.state;
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
                        Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." value={this.state.category} onChange={this.handleChange1}>
                                        {Category.map((tdata,index) => (
                                            <option value={tdata.job_category_name}>{tdata.job_category_name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="Skill">
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value} onChange={this.handleChange2}>
                                        {jobOffer.map((tdata,index) => (
                                            <option value={tdata.name_job_offer}>{tdata.name_job_offer}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Skills
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

export default AddSkillModal;