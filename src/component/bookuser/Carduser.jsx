import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Carduser = ({ book, addToCart }) => {
  return (
    <div className="card h-100">
      <div className="card-body bg-secondary text-light">
        <h5 className="card-title">{book.name}</h5>
        <p className="card-text"><strong>Author:</strong> {book.author}</p>
        <p className="card-text"><strong>Description:</strong> {book.description}</p>
        <p className="card-text"><strong>Value:</strong> {book.value}</p>
        <p className="card-text"><strong>Publish Date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
        <p className="card-text"><strong>Category Name:</strong> {book.categoryName}</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => addToCart(book)} // Call addToCart function on button click
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Carduser;
