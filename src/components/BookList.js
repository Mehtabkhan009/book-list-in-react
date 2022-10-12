import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ViewBookList from "./ViewBookList";

// getting data from local storage

const getDataFromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else return [];
};

const BookList = () => {
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [Isbn, setIsbn] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditiedValue] = useState();

  const [books, setBooks] = useState(getDataFromLS());
  // setting data in a local storage\
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handelOnSubmit = (e) => {
    e.preventDefault();

    let newbook = {
      bookname,
      author,
      Isbn,
    };
    setBooks([...books, newbook]);
    setBookName("");
    setAuthor("");
    setIsbn("");

    if(isEdit) {
      setBooks(books.map(a => a.id === editedValue.id ? editedValue : a));
    }
  };  


  // delete book
  const deleteBook = (Isbn) => {
    const filterdBooks = books.filter((element, index) => {
      return element.Isbn !== Isbn;
    });
    setBooks(filterdBooks);
  };
  const update= (book)=>{
    setIsEdit(true);
    setEditiedValue(book);
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Book List</h1>
        <Form action="#" onSubmit={handelOnSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Book</Form.Label>
            <Form.Control
              onChange={(e) => setBookName(e.target.value)}
              value={ bookname}
              defaultValue={isEdit? editedValue.bookname: bookname}
              type="text"
              placeholder="Enter book"
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="aurthor mb-3" controlId="formBasicAurthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              onChange={(e) => setAuthor(e.target.value)}
              value={ author}
              
              defaultValue={isEdit? editedValue.author: author}
              // value={author}
              type="text"
              placeholder="Enter Author"
              name="Author"
              required
            />
          </Form.Group>
          <Form.Group className="isbbn mb-3" controlId="formBasicIsbn">
            <Form.Label>ISBN#</Form.Label>
            <Form.Control
              onChange={(e) => setIsbn(e.target.value)}
              // value={Isbn}
              value={ Isbn}
              defaultValue={isEdit? editedValue.Isbn: Isbn}
              placeholder="Enter Isbn#"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div className="table">
        <h3
          className="newBooksAdded"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Books list
        </h3>
        <Table striped bordered hover size="sm" className="container">
          <thead>
            <tr>
              <th>#</th>
              <th>BOOK</th>
              <th>AUTHOR</th>
              <th>ISBN#</th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>
            <ViewBookList books={books} deleteBook={deleteBook} update={update} />
          </tbody>
        </Table>

        {books.length < 1 && (
          <div
            className={`text-capitalize mb-4 w-100 text-center text-warning`}
          >
            {" "}
            <h6>no book is added yet</h6>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default BookList;
