import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpenReader } from '@fortawesome/free-solid-svg-icons';



import '@fortawesome/fontawesome-free/css/all.min.css'; 

export default class Footer extends Component {
    render() {
        return (
            <div className="footer  text-white-50  text-center text-md-start vh-100 d-flex justify-content-center align-items-center ">
                <div className="container  ">
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col-md-6 col-lg-4 ">
                            <div className="info mb-5 text-center">
                            <a className="navbar-brand mb-4 " href="#">
                            {/* <img src="../../imges/logo.jpg" alt="logo"/> */}
                                <FontAwesomeIcon style={{ fontSize: '50px', color: 'white' }} icon={faBookOpenReader} />
                                </a>
                                {/* <img src="../../imges/logo.jpg" alt="" className="mb-4" /> */}
                                <p className="mb-5">
                                The “Shabab Pioneers of Egypt Digital” library, Assiut, is a pioneer 
                                in the field of book selling within Egypt. It includes an exceptional 
                                selection of the most prominent and important Arabic and foreign titles 
                                at prices within the reader’s reach.
                                </p>
                                <div className="copyright">
                                Created By <span>Developer:Mousa Mohamede 4M</span>
                                <div>&copy; 2024 - <span>BOOK STORE</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="links">
                                <h5 className="text-light">Links</h5>
                                <ul className="list-unstyled lh-lg">
                                    <li>Home</li>
                                    <li>Our Services</li>
                                    <li>Testimonials</li>
                                    <li>Support</li>
                                    <li>Terms and Condition</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <div className="links">
                                <h5 className="text-light">About Us</h5>
                                <ul className="list-unstyled lh-lg">
                                <li>Sign In</li>
                                <li>Register</li>
                                <li>About Us</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="contact">
                                <h5 className="text-light">Contact Us</h5>
                                <p className="lh-lg mt-3 mb-5">
                                Get in touch with us via mail or phone. We are waiting for your call or message.
                                </p>
                                <a className="btn rounded-pill main-btn w-100" href="mailto:mosaothman123k@gmail.com.com">
                                    mosaothman123k@gmail.com
                                </a>
                                <ul className="d-flex mt-5 list-unstyled gap-3">
                                {/* <li>
                                    <a className="d-block text-light" href="#">
                                    <i className="fa-brands fa-facebook fa-lg facebook rounded-circle p-2"></i>

                                    </a>
                                </li> */}
                                <li>
                                    <a className="d-block text-light" href="#">
                                    <i className="fa-brands fa-twitter fa-lg twitter rounded-circle p-2"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target='_blank' className="d-block text-light" href="https://www.linkedin.com/in/mousa-othman-4m?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                                    <i className="fa-brands fa-linkedin fa-lg linkedin rounded-circle p-2"></i>
                                    </a>
                                </li>
                                    <li>
                                        <a className="d-block text-light" href="#">
                                            <i className="fa-brands fa-youtube fa-lg youtube rounded-circle p-2"></i>
                                        </a>
                                    </li>  
                                    <li><a  className="d-block text-light" target ="_blank" 
                                                href="https://github.com/Mousa-Othman"><i
                                                            class="fa fab fa-lg fa-github rounded-circle p-2"></i></a> </li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
