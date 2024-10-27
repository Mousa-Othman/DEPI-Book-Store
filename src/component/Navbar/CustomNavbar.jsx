import React from 'react';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faBars } from '@fortawesome/free-solid-svg-icons';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './CustomNavbar.css'; // تأكد من استيراد ملف CSS المناسب

const CustomNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <FontAwesomeIcon style={{ fontSize: '50px', color: 'white' }} icon={faBookOpenReader} />
                </Link>
                <button 
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse" 
                    data-bs-target="#main" 
                    aria-controls="main" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="collapse navbar-collapse" id="main">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link p-lg-3 active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            {/* <Link className="nav-link p-lg-3" to="/books">Books</Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link p-lg-3" to="/user">User</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link p-lg-3" to="/author">Author</Link>
                        </li> */}
                       <li className="nav-item dropdown">
                            <Link 
                                className="nav-link dropdown-toggle p-lg-3" 
                                to="#" // يمكنك استبدالها إلى "/author" إذا كنت تريد مسارًا
                                id="navbarDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                Author
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/author/add">AddBooks</Link></li>
                                <li><Link className="dropdown-item" to="/author/search">Serch Books</Link></li>
                                <li><Link className="dropdown-item" to="/author/books">Booklist</Link></li>
                            </ul>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link p-lg-3" to="#">Contact</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default CustomNavbar;
