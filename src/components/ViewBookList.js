import React from "react";
// import BookList from './BookList'
const ViewBookList = ({ books ,deleteBook ,update}) => {
  return books.map((book, i) => (
    <tr key={book.Isbn}>
      <td>{i}</td>
      <td>{book.bookname}</td>
      <td>{book.author}</td>
      <td>{book.Isbn}</td>
      <td>
        <button
          className={`border  bg-transparent rounded text-primary`} 
          onClick={ ()=>update(book)}
        >Edit</button>
      </td>
      <td>
        <button
          className={`border  bg-transparent rounded text-danger`}
          onClick={()=>deleteBook(book.Isbn)}
        >Delete</button>
      </td>
    
    </tr>
  ));
};
export default ViewBookList;
