import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { createPopper } from '../node_modules/@popperjs/core';

import CustomNavbar from './component/Navbar/CustomNavbar.jsx';
import Header from './component/Header/Header.jsx';
import Footer from './component/Footer/Footer.jsx';
import BookList from './component/BookList/BookList.jsx';
import AddBook from './component/AddBook/AddBook.jsx';
import EditProduct from './component/EditProduct/EditProduct.jsx';
import MultiSearchComponent from './component/search/MultiSearchComponent.jsx';
import CategoriesComponent from './component/Categories/CategoriesComponent.jsx';
import axios from 'axios';
import MasterPage from './component/MasterPage/MasterPage.jsx';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary.jsx'; // استيراد مكون ErrorBoundary
// import User from './component/user/Userlist.jsx'
import Userlist from "./component/user/Userlist.jsx";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (url = 'http://mywebsite-bookstore.somee.com/api/Books') => {
    try {
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleEditComplete = () => {
    setSelectedBookId(null);
    setEditSuccess(true);
    fetchBooks();
  };

  const handleBookDelete = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
  };

  const handleSearchResults = (filteredBooks) => {
    setBooks(filteredBooks);
  };

  const router = createBrowserRouter([
    {
      path: '/home',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <Header />
            {/* <MultiSearchComponent onSearchResults={handleSearchResults} /> */}
            <Userlist
                books={books}
               />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <Header />
            <MasterPage />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '/Mousa-4m',
      element: (
        <ErrorBoundary>
          <>
            {/* <CustomNavbar /> */}
            {/* <Header /> */}
            <CategoriesComponent />
            <MultiSearchComponent onSearchResults={handleSearchResults} />
            {selectedBookId ? (
              <EditProduct 
                bookId={selectedBookId} 
                onEditComplete={handleEditComplete} 
              />
            ) : (
              <BookList 
                books={books}
                onSelectBook={handleBookSelect} 
                onDeleteBook={handleBookDelete}
              />
            )}
            {/* <Footer /> */}
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '/user',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            {/* <Header /> */}
            <MultiSearchComponent onSearchResults={handleSearchResults} />
            <Userlist
                books={books}
              />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '/author/books',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <Userlist
                books={books}
              />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '/author/add',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <AddBook onBookAdded={handleBookAdded} />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '/author/search',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <MultiSearchComponent onSearchResults={handleSearchResults} />
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    
    {
      path: '/author',
      element: (
        <ErrorBoundary>
          <>
            <CustomNavbar />
            <Header />
            <MultiSearchComponent onSearchResults={handleSearchResults} />
            {/* {selectedBookId ? (
              <EditProduct 
                bookId={selectedBookId} 
                onEditComplete={handleEditComplete} 
              />
            ) : (
              <BookList 
                books={books}
                onSelectBook={handleBookSelect} 
                onDeleteBook={handleBookDelete}
              />
            )} */}
              <Userlist
                books={books}
              />
            <AddBook onBookAdded={handleBookAdded} />
            
            <Footer />
          </>
        </ErrorBoundary>
      ),
    },
    {
      path: '*', // هذا المسار سيستخدم لالتقاط أي مسار غير معروف
      element: <ErrorBoundary>
                  <h1>404 Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                </ErrorBoundary>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
