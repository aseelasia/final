import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';
import AddModal from './AddModal';
import EditModal from './EditModal';
import AddSkillModal from './AddSkillModal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Snackbar from "@material-ui/core/Snackbar";


import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  ButtonToolbar,
  CardFooter,
  Button,
  Col
} from "reactstrap";

class Category extends React.Component {

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
        addSkillModalShow:false,

        offset1: 0,
        tableData1: [],
        orgtableData1: [],
        perPage1: 5,
        currentPage1: 0,
        isLoading1:false,
        isDataAvailable1:false,

        Snackbaropen :false,
        Snackbarmsg:'',
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageClick1 = this.handlePageClick1.bind(this);
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

  loadMoreData() {
  const data = this.state.orgtableData;
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  }

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
  }

  getData() {
    fetch('http://127.0.0.1:5000/table_search_job_category/')
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
    fetch('http://127.0.0.1:5000/table_search_sub_job_category/')
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

  deleteJobCategory(job_category_name){
    if(window.confirm('Are you sure you want to delete it?')){
      fetch('http://127.0.0.1:5000/delete_job_category/', {
        method:'POST',
        mode: 'cors',
        headers:new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }),
        body:JSON.stringify({
            job_category_name:job_category_name,
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

  render() {
    const {tableData, tableData1, oldJobCategoryName, category } = this.state;
    let addModalClose=()=> this.setState({addModalShow:false});
    let editModalClose=()=> this.setState({editModalShow:false});
    let addSkillModalClose=()=> this.setState({addSkillModalShow:false});
    const isLoading = this.state.isLoading;
    const isDataAvailable = this.state.isDataAvailable;
    const isLoading1 = this.state.isLoading1;
    const isDataAvailable1 = this.state.isDataAvailable1;
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
              <ButtonToolbar>
                <IconButton aria-label="add">
                  <AddIcon  onClick={()=> this.setState({addModalShow:true})}/>
                </IconButton>
                <AddModal 
                  show = {this.state.addModalShow}
                  onHide={addModalClose}
                />
                <Button
                  color="primary"
                  onClick={e => e.preventDefault()}
                  size="sm"
                  style={{marginLeft:"50px"}}
                  onClick={()=> this.setState({addSkillModalShow:true})}
                  >
                    Add job skills
                  </Button>
                  <AddSkillModal 
                  show = {this.state.addSkillModalShow}
                  onHide={addSkillModalClose}
                />
              </ButtonToolbar>
            </div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table 1 -Job Category-</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name Job Category</th>
                      <th scope="col">Name Job Offer</th>
                      <th scope="col">Actions</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                    {isDataAvailable
                    ?
                    <tbody>
                      {tableData.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.job_category_name}</td>
                          <td>{tdata.name_job_offer}</td>
                          <td>
                            <ButtonToolbar>
                                <IconButton aria-label="edit">
                                    <EditIcon
                                    onClick={() => this.setState({
                                    editModalShow:true,
                                    oldJobCategoryName : tdata.job_category_name
                                    })}
                                    />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon  onClick={() => this.deleteJobCategory(tdata.job_category_name)}/>
                                </IconButton>                            
                                <EditModal 
                                    show = {this.state.editModalShow}
                                    onHide={editModalClose}
                                    oldJobCategoryName = {oldJobCategoryName}
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
        <Container className="mt--10" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-defaultshadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Table 2 -Sub Job Category-</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">job category name</th>
                      <th scope="col">sub job category name</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                    {isDataAvailable1
                    ?
                    <tbody>
                      {tableData1.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.job_category_name}</td>
                          <td>{tdata.sub_job_category_name}</td>
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
                  </nav>
                </CardFooter>
                
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Category;
