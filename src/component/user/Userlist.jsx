import React, { useState, useEffect } from 'react';
import Carduser from '../bookuser/Carduser';
import 'bootstrap/dist/css/bootstrap.min.css';

const Userlist = ({ books }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('userCart')) || [];
    setCart(storedCart);
  }, []);

  // Function to handle adding book to cart
  const addToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem('userCart', JSON.stringify(updatedCart)); // Save cart to local storage
  };

  return (
    <div className="book-list-container container">
      <div className="book-list d-flex flex-wrap row">
        {books && books.length > 0 ? (
          books.map(book => (
            <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Carduser 
                book={book} 
                addToCart={addToCart} // Pass the addToCart function to Carduser
              />
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
      <div className="cart mt-4">
        <h3>Shopping Cart</h3>
        {cart.length > 0 ? (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.name} by {item.author}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </div>
  );
};

export default Userlist;
