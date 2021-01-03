import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';
import AddModal from './AddModal';
import EditModal from './EditModal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Snackbar from "@material-ui/core/Snackbar";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  ButtonToolbar,
  CardFooter,
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
        addModalShow:false,
        editModalShow:false,
        Snackbaropen :false,
        Snackbarmsg:'',
        level: 2,
        isBoos: false,
        isAdministrator:false,
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  SnackbarClose =(e) =>{
    this.setState({
      Snackbaropen:false
    });
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

  componentWillMount(){
    this.getData();
  }

  getData() {
    fetch('http://127.0.0.1:5000/search_employees/'+this.state.level)
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
    if(this.state.level == 1 || this.state.level == 2){
      this.setState({
        isBoos:true
      });          
    }
    else{
      this.setState({
        isBoos:false
      });         
    }
    if(this.state.level == 2){
      this.setState({
        isAdministrator:true
      });          
    }
    else{
      this.setState({
        isAdministrator:false
      });         
    }
  }

  deleteEmployee(email_employee){
    if(window.confirm('Are you sure you want to delete it?')){
      fetch('http://127.0.0.1:5000/delete_employee/', {
        method:'POST',
        mode: 'cors',
        headers:new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }),
        body:JSON.stringify({
          email_employee:email_employee,
        })
      })
      .then(function(response) {
        return response.json()
    })
    .then((result) => {
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'deleted successfully'
        });
    },
    (error)=>{
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'Failed'
        });
    })
    }
  }

  Show(email_employee){
    var isVisible = "show"
      fetch('http://127.0.0.1:5000/status_employee/', {
        method:'POST',
        mode: 'cors',
        headers:new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }),
        body:JSON.stringify({
          email_employee:email_employee,
          status_employee:isVisible
        })
      })
      .then(function(response) {
        return response.json()
    })
    .then((result) => {
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'Show data'
        });
    },
    (error)=>{
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'Failed'
        });
    })
  }
  
  Hide(email_employee){
    var isIbVisible = "hide"
      fetch('http://127.0.0.1:5000/status_employee/', {
        method:'POST',
        mode: 'cors',
        headers:new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }),
        body:JSON.stringify({
          email_employee:email_employee,
          status_employee:isIbVisible
        })
      })
      .then(function(response) {
        return response.json()
    })
    .then((result) => {
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'Hide data'
        });
    },
    (error)=>{
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'Failed'
        });
    })
  }

  render() {
    const {tableData, level_employee, email_employee } = this.state;
    let addModalClose=()=> this.setState({addModalShow:false});
    let editModalClose=()=> this.setState({editModalShow:false});
    const isLoading = this.state.isLoading;
    const isDataAvailable = this.state.isDataAvailable;
    const isBoos = this.state.isBoos;
    const isAdministrator = this.state.isAdministrator;
    
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
        <div className="header bg-gradient-red pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {isAdministrator
              ?
              <ButtonToolbar>
                <IconButton aria-label="add">
                  <AddIcon  onClick={()=> this.setState({addModalShow:true})}/>
                </IconButton>
                <AddModal 
                  show = {this.state.addModalShow}
                  onHide={addModalClose}
                />
              </ButtonToolbar>
              :
              <div></div>           
              }
            </div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                  <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Level</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Job Name</th>
                      <th scope="col">Company Work</th>
                      <th scope="col">Address</th>
                      <th scope="col">Linkedin</th>
                      <th scope="col">Date Job</th>
                      {isBoos
                      ?
                        <th scope="col">Actions</th>
                      :
                        <th scope="col" />
                      }
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
                          <td>{tdata.email}</td>
                          <td>{tdata.level}</td>
                          <td>{tdata.phone_number}</td>
                          <td>{tdata.nationality}</td>
                          <td>{tdata.job_name}</td>
                          <td>{tdata.company_work}</td>
                          <td>{tdata.address}</td>
                          <td>{tdata.linkedin}</td>
                          <td>{tdata.date_job}</td>
                          {isBoos
                          ?
                          <td>
                            <ButtonToolbar>
                              <IconButton aria-label="edit">
                                <EditIcon
                                 onClick={() => this.setState({
                                  editModalShow:true,
                                  level_employee : tdata.id,
                                  email_employee :tdata.email
                                })}
                                />
                              </IconButton>
                              <IconButton aria-label="delete">
                                <DeleteIcon  onClick={() => this.deleteEmployee(tdata.email_employee)}/>
                              </IconButton>
                              <IconButton aria-label="show">
                                <VisibilityIcon  onClick={() => this.Show(tdata.email_employee)}/>
                              </IconButton>
                              <IconButton aria-label="hide">
                                <VisibilityOffIcon  onClick={() => this.Hide(tdata.email_employee)}/>
                              </IconButton>                            
                              <EditModal 
                                show = {this.state.editModalShow}
                                onHide={editModalClose}
                                level_employee = {level_employee}
                                email_employee = {email_employee}
                              />
                            </ButtonToolbar>
                          </td>
                          :
                          <th scope="col" />
                          }
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
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
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
