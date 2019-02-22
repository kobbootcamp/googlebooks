import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getSaved()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
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
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.description,
        image: this.state.image,
        link: this.state.link
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>


        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books</h1>
              <p className="lead">Saved Books of Interest</p>
            </Jumbotron>
          </Col>
            </Row>
          <Row>
                <Col size="md-12">    
                {this.state.books.length ? (
                    <List>
                        {this.state.books.map(book => (
                        <ListItem key={book._id}>
                            <Link to={"/Saved/" + book._id}>
                            <strong>
                                {book.title} by {book.author}
                            </strong>
                            </Link>
                            <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
