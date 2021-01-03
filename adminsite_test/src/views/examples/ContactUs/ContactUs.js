import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardFooter,
  Button
} from "reactstrap";

class ContactUs extends React.Component {

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
        Snackbarmsg:'',
    }
    this.handlePageClick = this.handlePageClick.bind(this);
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
    fetch('http://127.0.0.1:5000/search_contact_us/')
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

  filter1(){
    fetch('http://127.0.0.1:5000/filter_contact_us_client/')
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

  filter2(){
    fetch('http://127.0.0.1:5000/filter_contact_us_person/')
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

  filter3(){
    fetch('http://127.0.0.1:5000/filter_contact_us_need_replay/')
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

  render() {
    const {tableData} = this.state;
    const isLoading = this.state.isLoading;
    const isDataAvailable = this.state.isDataAvailable;

    return (
      <>
        <div className="header bg-gradient-red pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Button
                color="primary"
                onClick={() => this.filter1()}
                size="lm"
                >
                  Filter contact us client
              </Button>
              <Button
                color="primary"
                onClick={() => this.filter2()}
                size="lm"
                >
                  Filter contact us person
              </Button>
              <Button
                color="primary"
                onClick={() => this.filter3()}
                size="lm"
              >
                Filter contact us need replay
              </Button>
              <div className="col text-right">
                <Button
                  onClick={() => this.getData()}
                  size="lm"
                  >
                    Reload
                </Button>
              </div>
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
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">phone_numbdr</th>
                      <th scope="col">address</th>
                      <th scope="col">service</th>
                      <th scope="col">note</th>
                      <th scope="col">The Employee Who Replied</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                    {isDataAvailable
                    ?
                    <tbody>
                      {tableData.map((tdata,index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>{tdata.id}</td>
                          <td>{tdata.name}</td>
                          <td>{tdata.email}</td>
                          <td>{tdata.phone_numbdr}</td>
                          <td>{tdata.address}</td>
                          <td>{tdata.service}</td>
                          <td>{tdata.note}</td>
                          <td>{tdata.employee_name}</td>
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

export default ContactUs;
