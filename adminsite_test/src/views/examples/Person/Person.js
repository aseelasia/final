import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';
import {Modal, Button, Col, Form} from 'react-bootstrap';


import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardFooter,
} from "reactstrap";

class Person extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        offset1: 0,
        tableData1: [],
        orgtableData1: [],
        perPage1: 5,
        currentPage1: 0,
        isLoading1:false,
        isDataAvailable1:false,
        ifFilter1:false,
        ifFilter1page:false,

        offset2: 0,
        tableData2: [],
        orgtableData2: [],
        perPage2: 5,
        currentPage2: 0,
        isLoading2:false,
        isDataAvailable2:false,
        ifFilter2:false,
        ifFilter2page:false,

        offset3: 0,
        tableData3: [],
        orgtableData3: [],
        perPage3: 5,
        currentPage3: 0,
        isLoading3:false,
        isDataAvailable3:false,
        ifFilter3:false,
        ifFilter3page:false,

        jobLevel:[],
        jobOffer:[],
        jobTime:[],
        value1:" ",
        value2:" ",
        value3:" ",
        value:" ",
        name:" "

    }
    this.handlePageClick1 = this.handlePageClick1.bind(this);
    this.handlePageClick2 = this.handlePageClick2.bind(this);
    this.handlePageClick3 = this.handlePageClick3.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
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

  handlePageClick2 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage2;

    this.setState({
        currentPage2: selectedPage,
        offset2: offset
    }, () => {
        this.loadMoreData2()
    });
  };

  handlePageClick3 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage3;

    this.setState({
        currentPage3: selectedPage,
        offset3: offset
    }, () => {
        this.loadMoreData3()
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

  loadMoreData2() {
    const data = this.state.orgtableData2;
    const slice = data.slice(this.state.offset2, this.state.offset2 + this.state.perPage2)
      this.setState({
        pageCount2: Math.ceil(data.length / this.state.perPage2),
        tableData2:slice
      })
    }

  loadMoreData3() {
  const data = this.state.orgtableData3;
  const slice = data.slice(this.state.offset3, this.state.offset3 + this.state.perPage3)
    this.setState({
      pageCount3: Math.ceil(data.length / this.state.perPage3),
      tableData3:slice
    })
  }

  componentWillMount(){
    this.getData1();
    this.getData2();
    this.getData3();
    this.getJobLevel();
    this.getJobOffer();
    this.getJobTime();
  }

  callData(){
    this.getData1();
    this.getData2();
    this.getData3();
    this.getJobLevel();
    this.getJobOffer();
    this.getJobTime();
  }

  getData1() {
    fetch('http://127.0.0.1:5000/search_person/')
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
        ifFilter1:false
      });
    });
  }

  getData2() {
    fetch('http://127.0.0.1:5000/search_job_person/')
    .then(response => response.json())
    .then(data => {
      var data2 = data;
      var slice = data2.slice(this.state.offset2, this.state.offset2 + this.state.perPage2)
      this.setState({
        pageCount2: Math.ceil(data2.length / this.state.perPage2),
        orgtableData2 :data,
        tableData2:slice,
        isDataAvailable2:true,
        isLoading2:true,
      });
    });
  }

  getData3() {
    fetch('http://127.0.0.1:5000/search_job_time_person/')
    .then(response => response.json())
    .then(data => {
      var data3 = data;
      var slice = data3.slice(this.state.offset3, this.state.offset3 + this.state.perPage3)
      this.setState({
        pageCount3: Math.ceil(data3.length / this.state.perPage3),
        orgtableData3 :data,
        tableData3:slice,
        isDataAvailable3:true,
        isLoading3:true,
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
    if (prevProps.orgtableData1 != this.state.orgtableData1)
      this.state.ifFilter1 = true
    if(prevProps.pageCount1 != this.state.pageCount1)
      this.state.ifFilter1page = true
      
    if (prevProps.orgtableData2 != this.state.orgtableData2)
      this.state.ifFilter2 = true
    if(prevProps.pageCount2 != this.state.pageCount2)
      this.state.ifFilter2page = true
      
    if (prevProps.orgtableData3 != this.state.orgtableData3)
      this.state.ifFilter3 = true
    if(prevProps.pageCount3 != this.state.pageCount3)
      this.state.ifFilter3page = true
  }

  handleSubmit = event => {
    var url="";
    event.preventDefault();
    if( this.state.value != " " ||
      this.state.name != " " ||
      this.state.value1 != " " ||
      this.state.value2 != " " ||
      this.state.value3 != " "
    )
    {
      console.log(this.state.value)
      console.log(this.state.name)
      console.log(this.state.value1)
      console.log(this.state.value2)
      console.log(this.state.value3)
      if(this.state.value == " "){
        url += " /"
      }
      else{
        url += "'"+this.state.value+"'/"
      }
      if(this.state.name == " "){
        url += " /"
      }
      else{
        url += ""+this.state.name+"/"
      }
      if(this.state.value1 == " "){
        url += " /"
      }
      else{
        url += "'"+this.state.value1+"'/"
      }
      if(this.state.value2 == " "){
        url += " /"
      }
      else{
        url += "'"+this.state.value2+"'/"
      }
      if(this.state.value3 == " "){
        url += " /"
      }
      else{
        url += "'"+this.state.value3+"'/"
      }
      fetch("http://127.0.0.1:5000/filter_person/"+url)
      .then(response => response.json())
      .then(data => {/*data[0].person.forEach(p => console.log(p)) data[0].person.forEach(p => console.log(p.name))*/
        var data1 = data[0].person;
        var slice1 = data1.slice(this.state.offset1, this.state.offset1 + this.state.perPage1)
        console.log(data1)
        if(data[0].person.length > 0){
          this.setState({
            pageCount1: Math.ceil(data1.length / this.state.perPage1),
            orgtableData1 :data1,
            tableData1:slice1,
            isDataAvailable1:true,
            isLoading1:true,
            ifFilter1:true,
            ifFilter1page:true
          });
        }
        else if(data[0].person.length == 0){
          this.setState({
            isDataAvailable1:false,
            isLoading1:false,
            ifFilter1:false,
            ifFilter1page:false,
          });        
        }
        var data2 = data[0].job_level_offer;
        var slice2 = data2.slice(this.state.offset2, this.state.offset2+ this.state.perPage2)
        console.log(data2)
        if(data[0].job_level_offer.length > 0){
          this.setState({
            pageCount2: Math.ceil(data2.length / this.state.perPage2),
            orgtableData2 :data2,
            tableData2:slice2,
            isDataAvailable2:true,
            isLoading2:true,
            ifFilter2:true,
            ifFilter2page:true
          });
        }
        else if(data[0].job_level_offer.length == 0){
          this.setState({
            isDataAvailable2:false,
            isLoading2:false,
            ifFilter2:false,
            ifFilter2page:false,
          });        
        }
        var data3 = data[0].job_time;
        var slice3 = data3.slice(this.state.offset3, this.state.offset3 + this.state.perPage3)
        console.log(data3)
        if(data[0].job_time.length > 0){
          this.setState({
            pageCount3: Math.ceil(data3.length / this.state.perPage3),
            orgtableData3 :data3,
            tableData3:slice3,
            isDataAvailable3:true,
            isLoading3:true,
            ifFilter3:true,
            ifFilter3page:true
          });
        }
        else if(data[0].job_time.length == 0){
          this.setState({
            isDataAvailable3:false,
            isLoading3:false,
            ifFilter3:false,
            ifFilter3page:false,
          });        
        }
      })
    }
    else{
      this.getData1();
      this.getData2();
      this.getData3();
    }
  }

  render() {
    const {tableData1, tableData2, tableData3, jobLevel, jobOffer, jobTime} = this.state;

    const isLoading1 = this.state.isLoading1;
    const isLoading2 = this.state.isLoading2;
    const isLoading3 = this.state.isLoading3;

    const ifFilter1 = this.state.ifFilter1;
    const ifFilter1page = this.state.ifFilter1page;
    const ifFilter2 = this.state.ifFilter2;
    const ifFilter2page = this.state.ifFilter2page;
    const ifFilter3 = this.state.ifFilter3;
    const ifFilter3page = this.state.ifFilter3page;
    
    const isDataAvailable1 = this.state.isDataAvailable1;
    const isDataAvailable2 = this.state.isDataAvailable2;
    const isDataAvailable3 = this.state.isDataAvailable3;

    return (
      <>
        <div className="header bg-gradient-red pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body" >
              <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col lg="4">
                <Form.Group controlId = "name">
                  <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="name"
                      type="text"
                      name="name"
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Form.Group>
              </Col>
              <Col lg="4">
                <Form.Group controlId="Status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" defaultValue="Choose..." value={this.state.value} onChange={this.handleChange}>
                    <option value={" "}></option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="pending">pending</option>
                  </Form.Control>
                </Form.Group>              
              </Col>
                <Col lg="4">
                  <Form.Group controlId="joblevel">
                    <Form.Label>Job Level</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value1} onChange={this.handleChange1}>
                      <option value={" "}></option>
                      {jobLevel.map((tdata,index) => (
                        <option value={tdata.name_job_level}>{tdata.name_job_level}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                </Row>

                <Row>
                <Col lg="4">
                  <Form.Group controlId="joboffer">
                    <Form.Label>Job Offer</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value2} onChange={this.handleChange2}>
                      <option value={" "}></option>
                      {jobOffer.map((tdata,index) => (
                        <option value={tdata.name_job_offer}>{tdata.name_job_offer}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="4">
                  <Form.Group controlId="jobtime">
                    <Form.Label>Job Time</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={this.state.value3} onChange={this.handleChange3}>
                      <option value={" "}></option>
                      {jobTime.map((tdata,index) => (
                        <option value={tdata.job_time}>{tdata.job_time}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
            </Row>
            <div className="col text-right">
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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
        <div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table 1 -person-</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  {ifFilter1 ?
                  <div>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Linkedin</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Education</th>
                      <th scope="col">Age</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Note</th>
                      <th scope="col">CV</th>
                      <th scope="col">Video URL</th>
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
                          <td>{tdata.email}</td>
                          <td>{tdata.linkedin}</td>
                          <td>{tdata.phone_number}</td>
                          <td>{tdata.gender}</td>
                          <td>{tdata.education}</td>
                          <td>{tdata.age}</td>
                          <td>{tdata.nationality}</td>
                          <td>{tdata.note}</td>
                          <td>{tdata.cv}</td>
                          <td>{tdata.video_url}</td>
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
                      <th scope="col">Linkedin</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Education</th>
                      <th scope="col">Age</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Note</th>
                      <th scope="col">CV</th>
                      <th scope="col">Video URL</th>
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
                          <td>{tdata.email}</td>
                          <td>{tdata.linkedin}</td>
                          <td>{tdata.phone_number}</td>
                          <td>{tdata.gender}</td>
                          <td>{tdata.education}</td>
                          <td>{tdata.age}</td>
                          <td>{tdata.nationality}</td>
                          <td>{tdata.note}</td>
                          <td>{tdata.cv}</td>
                          <td>{tdata.video_url}</td>
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
                  }</div>
                  :<div>
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
                  }</div>}
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
        </div>
        <div>
        <Container className="mt--10" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-defaultshadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Table 2 -job person-</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  {ifFilter2 ?
                  <div>
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Job Level</th>
                      <th scope="col">Job Offer</th>
                      <th scope="col">Experince</th>
                      <th scope="col">My Assessment</th>
                      <th scope="col">Last Employee Rated</th>
                      <th scope="col">Employee Assessment</th>
                    </tr>
                  </thead>
                  {isDataAvailable2
                    ?
                    <tbody>
                      {tableData2.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.job_level}</td>
                          <td>{tdata.job_offer}</td>
                          <td>{tdata.experince}</td>
                          <td>{tdata.my_assessment}</td>
                          <td>{tdata.last_employee_rated}</td>
                          <td>{tdata.employee_assessment}</td>
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
                    </div>:                  <div>
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Job Level</th>
                      <th scope="col">Job Offer</th>
                      <th scope="col">Experince</th>
                      <th scope="col">My Assessment</th>
                      <th scope="col">Last Employee Rated</th>
                      <th scope="col">Employee Assessment</th>
                    </tr>
                  </thead>
                  {isDataAvailable2
                    ?
                    <tbody>
                      {tableData2.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.job_level}</td>
                          <td>{tdata.job_offer}</td>
                          <td>{tdata.experince}</td>
                          <td>{tdata.my_assessment}</td>
                          <td>{tdata.last_employee_rated}</td>
                          <td>{tdata.employee_assessment}</td>
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
                  {ifFilter2page ?
                  <div>
                  {isLoading2
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount2}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick2}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }
                  </div>:
                  <div>
                  {isLoading2
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount2}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick2}
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
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Table 3 -job time person-</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  {ifFilter3 ?
                  <div>                  
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Job Time</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  {isDataAvailable3
                    ?
                    <tbody>
                      {tableData3.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.job_time}</td>
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
                    </div>:
                    <div>                  
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Job Time</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                  {isDataAvailable3
                    ?
                    <tbody>
                      {tableData3.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.job_time}</td>
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
                  {ifFilter3page ?
                  <div>
                  {isLoading3
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount3}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick3}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                    :
                    <div style={{height:"200px"}}></div>
                  }
                  </div>:
                  <div>
                  {isLoading3
                  ?                    
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount3}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick3}
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
            </Col>
          </Row>
        </Container>
        </div>
      </>
    );
  }
}

export default Person;
