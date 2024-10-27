import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <header className="header text-center ">
                <div className='col-6 '>
                    <h1 className='text-primary fs-1'>Welcome to the Bookstore</h1>
                    <p className='fs-3 text-info'>Greetings and welcome to our bookstore! Here, you'll find
                        everything you need to nourish your mind and inspire your 
                        imagination.
                    </p>
                </div>
                
            </header>
        );
    }
}

// export default Header;
