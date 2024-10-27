import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookCard.module.css';
import DeleteBook from '../DeleteBook/DeleteBook.jsx';

const BookCard = ({ book, onSelect, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteComplete = (bookId) => {
    onDelete(bookId);
  };

  return (
    <div className="card h-100">
      <div className="card-body bg-secondary text-light">
        <h5 className="card-title">{book.name}</h5>
        <p className="card-text"><strong>Author:</strong> {book.author}</p>
        <p className="card-text"><strong>Description:</strong> {book.description}</p>
        <p className="card-text"><strong>Value:</strong> {book.value}</p>
        <p className="card-text"><strong>Publish Date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
        <p className="card-text"><strong>Category Name:</strong> {book.categoryName}</p>
        <div className="d-flex justify-content-between mt-3">
          <button onClick={() => onSelect(book.id)} className="btn btn-info">Edit Book</button>
          <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger">Delete Book</button>
        </div>

        {showDeleteModal && (
          <DeleteBook 
            bookId={book.id} 
            onDeleteComplete={handleDeleteComplete} 
            onClose={() => setShowDeleteModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
