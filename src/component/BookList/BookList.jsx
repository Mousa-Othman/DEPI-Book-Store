import React from 'react';
import BookCard from '../BookCard/BookCard.jsx';
import './BookList.module.css';

const BookList = ({ books, onSelectBook, onDeleteBook }) => {
  return (
    <div className="book-list-container container">
      <div className="book-list d-flex flex-wrap row">
        {books.map(book => (
          <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <BookCard 
              book={book} 
              onSelect={onSelectBook} 
              onDelete={onDeleteBook} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
