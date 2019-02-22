import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Axios from "axios";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: "", 
    search: ""
  };

  componentDidMount() {
    // this.loadBooks();
  };

  getBooks = () => {
      return Axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.search, function (res,err) {
        // this.setState({books: res.data})

  })
}
 
    loadBooks = () => {
    this.getBooks()
      .then(response => {
      this.setState({books: response.data.items})
      console.log(response)
    })
        // console.log(this.state.books.data.items)})
        // .then(this.state.books.data.items.map((book) => {
            // console.log(book)
        // }))
        // console.log(this.state.books.data.items[0].volumeInfo.title);
      };


    // API.getBooks()
    //   .then(res =>
    //     this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
    //   )
    //   .catch(err => console.log(err));


  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = id => {
    API.saveBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.loadBooks()
    // if (this.state.title) {
    //   API.saveBook({
    //     title: this.state.title,
    //     author: this.state.author,
    //     synopsis: this.state.description,
    //     image: this.state.image,
    //     link: this.state.link
    //   })
    //     .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // }
  };


  // renderSearch() {
  //   return (
  //     <Container fluid>


  //     <Row>
  //       <Col size="md-12">
  //         <Jumbotron>
  //           <h1>(React) Google Books Search</h1>
  //           <p className="lead">Search for and Save Books of Interest</p>
  //         </Jumbotron>
  //         <form>
  //           <Input
  //             value={this.state.search}
  //             onChange={this.handleInputChange}
  //             name="search"
  //             placeholder="Search Book Subject"
  //           />
  //             <FormBtn
  //               onClick={this.handleFormSubmit}
  //           >
  //             Search
  //           </FormBtn>
  //         </form>
  //       </Col>
  //         </Row>
  //       <Row>
  //             <Col size="md-12">    
  //                 <List>
  //                     {this.state.books.map(book => (
  //                     <ListItem key={book._id}>
  //                         <Link to={"/books/" + book._id}>
  //                         <strong>
  //                             {book.title} by {book.author}
  //                         </strong>
  //                         </Link>
  //                         <DeleteBtn onClick={() => this.deleteBook(book._id)} />
  //                     </ListItem>
  //                     ))}
  //                 </List>
  //             </Col>
  //         </Row>
  //   </Container>

  //   )
  // }
  render() {
    return (
      <Container fluid>


        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <p className="lead">Search for and Save Books of Interest</p>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search Book Subject"
              />
                <FormBtn
                  onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
            </Row>
          <Row>
                <Col size="md-12">    
                {this.state.books.length ? (
                    <List>
                        {this.state.books.map(book => (
                        <ListItem key={book._id}>
                        <img src= {book.volumeInfo.imageLinks.thumbnail}></img>
                            <Link to={book.volumeInfo.infoLink}>
                            <strong>
                                {book.volumeInfo.title} by {book.volumeInfo.authors}
                            </strong>
                            </Link>
                            <p>
                                {book.searchInfo.textSnippet}
                              
                              </p>
                            <SaveBtn onClick={() => this.saveBook(book._id)} />
                        </ListItem>
                        ))}
                    </List>
                    ) : (
                    <h3>No Results to Display</h3>
                    )}
                </Col>
            </Row>
      </Container>
    );
  }
}

export default Books;
