import React from "react";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <span className="navbar-header">
          <FontAwesomeIcon icon={faPaw} className="fa-paw" />
          <h1 className="navbar-title">BARK</h1>
        </span>
      </Link>
    </nav>
  );
}

export default Navbar;
