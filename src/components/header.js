/*
header (top navigation) for the website
*/
import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Header = ({ siteTitle }) => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" state={{ locale: "en-US" }}>{siteTitle}</Link>
        <div className="collapse navbar-collapse" id="newsHeaderNav">
          <div className="navbar-nav">
            <Link className="nav-link active" to="/" state={{ locale: "en-US" }}>English</Link>
            <Link className="nav-link" to="/" state={{ locale: "fr" }}>French</Link>
            <Link className="nav-link" to="/video">Video</Link>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;