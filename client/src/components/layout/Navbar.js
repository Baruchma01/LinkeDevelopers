import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logOut }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard
        </Link>
      </li>
      <li>
        <Link to='/' onClick={logOut} >
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>{" "}
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
        <li>
        <Link to="/profiles">Developers-List</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fab fa-connectdevelop" /> LinkeDevlopers
        </Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated? authLinks : guestLinks}</Fragment>)}
    </nav>
  );
};

Navbar.prototype = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

Navbar.prototype = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
