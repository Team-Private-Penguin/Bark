import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-header">
        <FontAwesomeIcon icon={faPaw} className="fa-paw" />
        <h1 className="navbar-title">Bark</h1>
      </span>
    </nav>
  );
}

export default Navbar;
