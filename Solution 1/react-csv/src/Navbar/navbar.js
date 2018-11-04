import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-dark  m-navbar justify-content-between">
            <Link className="navbar-brand" to="/">CSV-React</Link>
            <Link className="btn m-btn offset-sm-9 col-sm-1" to="/" > Home </Link>
            <Link className="btn m-btn  col-sm-1" to="/upload" > Upload CSV  </Link>
          </nav>
      </div>
    );
  }
}

export default Navbar;
