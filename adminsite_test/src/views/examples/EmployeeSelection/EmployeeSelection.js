import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';
import {Modal, Button, Col, Form} from 'react-bootstrap';
import EditModal1 from './EditModal1';
import EditModal2 from './EditModal2';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from "@material-ui/core/Snackbar";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardFooter,
  ButtonToolbar,
} from "reactstrap";

class JobLevel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        offset: 0,
        tableData: [],
        orgtableData: [],
        perPage: 5,
        currentPage: 0,
        isLoading:false,
        isDataAvailable:false,
        editModalShow:false,
        ifFilter:false,
        ifFilterpage:false,

        offset1: 0,
        tableData1: [],
        orgtableData1: [],
        perPage1: 5,
        currentPage1: 0,
        isLoading1:false,
        isDataAvailable1:false,
        editModalShow1:false,
        ifFilter1:false,
        ifFilter1page:false,

        jobLevel:[],
        jobOffer:[],
        jobTime:[],
        value:" ",
        value1:" ",
        value2:" ",
        value3:" ",
        value4:" ",
        age:" ",
        gender:" ",
        nationality:" ",
        education:" ",
        result:" ",
        
        Snackbaropen :false,
        Snackbarmsg:'',
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageClick1 = this.handlePageClick1.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
}
handleChange1(event) {
    this.setState({value1: event.target.value});
}
handleChange2(event) {
    this.setState({value2: event.target.value});
}
handleChange3(event) {
    this.setState({value3: event.target.value});
}
handleChange4(event) {
  this.setState({value5: event.target.value});
}
handleChange5(event) {
  this.setState({gender: event.target.value});
}

validateForm() { 
  return this.state.value2.length > 0;
}

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });
  };

  loadMoreData() {
  const data = this.state.orgtableData;
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  }

  handlePageClick1 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage1;

    this.setState({
        currentPage1: selectedPage,
        offset1: offset
    }, () => {
        this.loadMoreData1()
    });
  };

  loadMoreData1() {
  const data = this.state.orgtableData1;
  const slice = data.slice(this.state.offset1, this.state.offset1 + this.state.perPage1)
    this.setState({
      pageCount1: Math.ceil(data.length / this.state.perPage1),
      tableData1:slice
    })
  }

  componentWillMount(){
    this.getData();
    this.getData1();
    this.getJobLevel();
    this.getJobOffer();
    this.getJobTime();
  }
  callData(){
    this.getData1();
    this.getData();
    this.getJobLevel();
    this.getJobOffer();
    this.getJobTime();
  }

  getData() {
    fetch('http://127.0.0.1:5000/search_employee_selection/')
    .then(response => response.json())
    .then(data => {
      var data1 = data;
      var slice = data1.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data1.length / this.state.perPage),
        orgtableData :data,
        tableData:slice,
        isDataAvailable:true,
        isLoading:true,
      });
    });
  }

  getData1() {
    fetch('http://127.0.0.1:5000/search_public_rate/')
    .then(response => response.json())
    .then(data => {
      var data1 = data;
      var slice = data1.slice(this.state.offset1, this.state.offset1 + this.state.perPage1)
      this.setState({
        pageCount1: Math.ceil(data1.length / this.state.perPage1),
        orgtableData1 :data,
        tableData1:slice,
        isDataAvailable1:true,
        isLoading1:true,
      });
    });
  }

  getJobLevel() {
    fetch('http://127.0.0.1:5000/search_job_level/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        jobLevel :data,
      });
    });
  }

  getJobOffer() {
    fetch('http://127.0.0.1:5000/search_job_offer/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        jobOffer :data,
      });
    });
  }

  getJobTime() {
    fetch('http://127.0.0.1:5000/search_job_time/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        jobTime :data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.orgtableData != this.state.orgtableData)
    this.state.ifFilter = true
  if(prevProps.pageCount != this.state.pageCount)
    this.state.ifFilterpage = true

    if (prevProps.orgtableData1 != this.state.orgtableData1)
      this.state.ifFilter1 = true
    if(prevProps.pageCount1 != this.state.pageCount1)
      this.state.ifFilter1page = true
  }

  handleSubmit = event => {}

  render() {
    const {tableData, tableData1, jobLevel, jobOffer, jobTime,
      email_person,job_level,job_offer,old_employee_rate,
      number_employee_rate,email_employee, old_rate_public,
      number_rate, note_rate
    } = this.state;

    const isLoading = this.state.isLoading;
    const isDataAvailable = this.state.isDataAvailable;
    const isLoading1 = this.state.isLoading1;
    const isDataAvailable1 = this.state.isDataAvailable1;

    let editModalClose=()=> this.setState({editModalShow:false});
    let editModalClose1=()=> this.setState({editModalShow1:false});

    const ifFilter1 = this.state.ifFilter1;
    const ifFilter1page = this.state.ifFilter1page;
    const ifFilter = this.state.ifFilter;
    const ifFilterpage = this.state.ifFilterpage;

    return (
      <>
        <div className="header bg-gradient-red pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
            <Form onSubmit={this.handleSubmit}>
            <Row>
                <Col lg="3">
                    <Form.Group controlId = "age">
                    <Form.Label>Age</Form.Label>
                        <Form.Control
                            defaultValue=" "
                            placeholder="age"
                            type="text"
                            name="age"
                            required
                            defaultValue=" "
                            onChange={(e) => this.setState({ age: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col lg="3">
                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." value={this.state.gender} onChange={this.handleChange5}>
                            <option value=" "> </option>
                            <option value="Male">Male</option>
                            <option value="Female">female</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg="3">
                    <Form.Group controlId = "nationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                            placeholder="nationality"
                            type="text"
                            name="nationality"
                            required
                            defaultValue=" "
                            onChange={(e) => this.setState({ nationality: e.target.value })}
                        />
                    </Form.Group>
                </Col>
                <Col lg="3">
                    <Form.Group controlId = "education">
                    <Form.Label>Education</Form.Label>
                        <Form.Control
                            placeholder="education"
                            type="text"
                            name="education"
                            required
                            defaultValue=" "
                            onChange={(e) => this.setState({ education: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg="3">
                <Form.Group controlId="jobtime">
                    <Form.Label>Job Time</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value3} onChange={this.handleChange3}>
                      <option value=" "></option>
                      {jobTime.map((tdata,index) => (
                        <option value={tdata.job_time}>{tdata.job_time}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="8">
                <Col lg="3">
                <Form.Group controlId="joblevel">
                    <Form.Label>Job Level</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value1} onChange={this.handleChange1}>
                      <option value=" "></option>
                      {jobLevel.map((tdata,index) => (
                        <option value={tdata.name_job_level}>{tdata.name_job_level}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="3">
                <Form.Group controlId="joboffer">
                    <Form.Label>Job Offer</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value2} onChange={this.handleChange2}>
                      <option value=" "></option>
                      {jobOffer.map((tdata,index) => (
                        <option value={tdata.name_job_offer}>{tdata.name_job_offer}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="3">
                    <Form.Group controlId="skills3">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." value={this.state.value} onChange={this.handleChange}>
                            <option value=" "></option>
                            <option value="0">0-1</option>
                            <option value="1">1-3</option>
                            <option value="3">3-5</option>
                            <option value="4">Greater than seven</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg="3">
                    <Form.Group controlId="skills4">
                        <Form.Label>Prerequiste</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." value={this.state.value4} onChange={this.handleChange4}>
                            <option value=" "></option>
                            <option value="0">Prerequiste</option>
                            <option value="1">Non Prerequiste</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                </Col></Row>
                <Row>

                
                <Col lg="2">
                    <Form.Group controlId = "numberOfResults">
                        <Form.Label>Number of results</Form.Label>
                        <Form.Control
                            defaultValue=" "
                            placeholder="numberOfResults"
                            type="text"
                            name="numberOfResults"
                            required
                            onChange={(e) => this.setState({ result: e.target.value })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="col text-right">
              <Button variant="primary" type="submit" disabled={!this.validateForm()} onClick={this.handleSubmit} >
                Filter
              </Button>
                <Button
                  color="black"
                  onClick={() => this.callData()}
                  size="lm"
                  >
                    Clear
                </Button>
              </div>
            </Form>
            </div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table 1 -Employee Selection-</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  {ifFilter1 ?
                  <div>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Job Level</th>
                      <th scope="col">Job Offer</th>
                      <th scope="col">Experience</th>
                      <th scope="col">My assessment</th>
                      <th scope="col">The Last Evaluator</th>
                      <th scope="col">Employee Assessment</th>
                      <th scope="col">Number Employee Assessment</th>
                      <th scope="col">Note</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                    {isDataAvailable
                    ?
                    <tbody>
                      {tableData.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.email_person}</td>
                          <td>{tdata.job_level}</td>
                          <td>{tdata.job_offer}</td>
                          <td>{tdata.experince}</td>
                          <td>{tdata.my_assessment}</td>
                          <td>{tdata.the_last_evaluator}</td>
                          <td>{tdata.employee_assessment}</td>
                          <td>{tdata.number_employee_assessment}</td>
                          <td>{tdata.note}</td>
                          <td>
                            <ButtonToolbar>
                              <IconButton aria-label="edit">
                                <EditIcon
                                 onClick={() => this.setState({
                                  editModalShow:true,
                                  email_person:tdata.email_person,
                                  job_level:tdata.job_level,
                                  job_offer:tdata.job_offer,
                                  old_employee_rate:tdata.employee_assessment,
                                  number_employee_rate:tdata.number_employee_assessment,
                                  email_employee:"Masa123@gmail.com",
                                })}
                                />
                              </IconButton>
                              
                              <EditModal1 
                                show = {this.state.editModalShow}
                                onHide={editModalClose}
                                email_person={email_person}
                                job_level={job_level}
                                job_offer={job_offer}
                                old_employee_rate={old_employee_rate}
                                number_employee_rate={number_employee_rate}
                                email_employee={email_employee}
                              />
                            </ButtonToolbar>
                          </td>
                        </tr>
                      )
                      )}
                      </tbody>
                    :<tbody>
                      <tr>
                        <td>No matching record data</td>
                      </tr>
                    </tbody>
                    }
                    </div>
                    :
                    <div>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Job Level</th>
                        <th scope="col">Job Offer</th>
                        <th scope="col">Experience</th>
                        <th scope="col">My assessment</th>
                        <th scope="col">The Last Evaluator</th>
                        <th scope="col">Employee Assessment</th>
                        <th scope="col">Number Employee Assessment</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                      {isDataAvailable
                      ?
                      <tbody>
                        {tableData.map((tdata,index) => (
                          <tr>
                            <td>{index+1}</td>
                            <td>{tdata.name}</td>
                            <td>{tdata.email_person}</td>
                            <td>{tdata.job_level}</td>
                            <td>{tdata.job_offer}</td>
                            <td>{tdata.experince}</td>
                            <td>{tdata.my_assessment}</td>
                            <td>{tdata.the_last_evaluator}</td>
                            <td>{tdata.employee_assessment}</td>
                            <td>{tdata.number_employee_assessment}</td>
                            <td>{tdata.note}</td>
                            <td>
                              <ButtonToolbar>
                                <IconButton aria-label="edit">
                                  <EditIcon
                                   onClick={() => this.setState({
                                    editModalShow:true,
                                    email_person:tdata.email_person,
                                    job_level:tdata.job_level,
                                    job_offer:tdata.job_offer,
                                    old_employee_rate:tdata.employee_assessment,
                                    number_employee_rate:tdata.number_employee_assessment,
                                    email_employee:"Masa123@gmail.com",
                                  })}
                                  />
                                </IconButton>
                                
                                <EditModal1 
                                  show = {this.state.editModalShow}
                                  onHide={editModalClose}
                                  email_person={email_person}
                                  job_level={job_level}
                                  job_offer={job_offer}
                                  old_employee_rate={old_employee_rate}
                                  number_employee_rate={number_employee_rate}
                                  email_employee={email_employee}
                                />
                              </ButtonToolbar>
                            </td>
                          </tr>
                        )
                        )}
                        </tbody>
                      :<tbody>
                        <tr>
                          <td>No matching record data</td>
                        </tr>
                      </tbody>
                      }
                      </div>
                    }
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                  {ifFilter1page ?
                  <div>
                  {isLoading
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }</div>
                  :<div>
                  {isLoading
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }
                  </div>
                  }
                  </nav>
                </CardFooter>
                
              </Card>
            </div>
          </Row>
        </Container>
        <div style={{marginTop:"30px"}}></div>
        <Container className="mt--10" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table 2 -Public Rate-</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                {ifFilter1 ?
                  <div>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Final Employee Assessment</th>
                      <th scope="col">Public Assessment</th>
                      <th scope="col">Number Public Assessment</th>
                      <th scope="col">Note</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                    {isDataAvailable1
                    ?
                    <tbody>
                      {tableData1.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.email_person}</td>
                          <td>{tdata.final_employee_assessment}</td>
                          <td>{tdata.public_assessment}</td>
                          <td>{tdata.number_public_assessment}</td>
                          <td>{tdata.note}</td>
                          <td>
                            <ButtonToolbar>
                              <IconButton aria-label="edit">
                                <EditIcon
                                 onClick={() => this.setState({
                                  editModalShow1:true,
                                  email_person:tdata.email_person,
                                  old_rate_public:tdata.public_assessment,
                                  number_rate:tdata.number_public_assessment,
                                  note_rate:tdata.note,
                                  email_employee:"Masa123@gmail.com",
                                })}
                                />
                              </IconButton>
                              
                              <EditModal2 
                                show = {this.state.editModalShow1}
                                onHide={editModalClose1}
                                email_person={email_person}
                                old_rate_public={old_rate_public}
                                number_rate={number_rate}
                                note_rate={note_rate}
                                email_employee={email_employee}
                              />
                            </ButtonToolbar>
                          </td>
                        </tr>
                      )
                      )}
                      </tbody>
                    :<tbody>
                      <tr>
                        <td>No matching record data</td>
                      </tr>
                    </tbody>
                    }
                    </div>
                    :
                    <div>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Final Employee Assessment</th>
                        <th scope="col">Public Assessment</th>
                        <th scope="col">Number Public Assessment</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                      {isDataAvailable1
                      ?
                      <tbody>
                        {tableData1.map((tdata,index) => (
                          <tr>
                            <td>{index+1}</td>
                            <td>{tdata.name}</td>
                            <td>{tdata.email_person}</td>
                            <td>{tdata.final_employee_assessment}</td>
                            <td>{tdata.public_assessment}</td>
                            <td>{tdata.number_public_assessment}</td>
                            <td>{tdata.note}</td>
                            <td>
                              <ButtonToolbar>
                                <IconButton aria-label="edit">
                                  <EditIcon
                                   onClick={() => this.setState({
                                    editModalShow1:true,
                                    email_person:tdata.email_person,
                                    old_rate_public:tdata.public_assessment,
                                    number_rate:tdata.number_public_assessment,
                                    note_rate:tdata.note,
                                    email_employee:"Masa123@gmail.com",
                                  })}
                                  />
                                </IconButton>
                                
                                <EditModal2 
                                  show = {this.state.editModalShow1}
                                  onHide={editModalClose1}
                                  email_person={email_person}
                                  old_rate_public={old_rate_public}
                                  number_rate={number_rate}
                                  note_rate={note_rate}
                                  email_employee={email_employee}
                                />
                              </ButtonToolbar>
                            </td>
                          </tr>
                        )
                        )}
                        </tbody>
                      :<tbody>
                        <tr>
                          <td>No matching record data</td>
                        </tr>
                      </tbody>
                      }
                      </div>
                    }
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                  {ifFilter1page ?
                  <div>
                  {isLoading1
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick1}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }
                  </div>
                  :
                  <div>
                  {isLoading1
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick1}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }
                  </div>
                }
                  </nav>
                </CardFooter>
                
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default JobLevel;
