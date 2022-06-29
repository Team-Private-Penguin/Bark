import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import AddUser from "./Users/AddUser";

function Navbar() {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState({
    energy: "",
    f_dogs: "",
    f_people: "",
    name: "",
    photo: "",
    size: "",
    user_id: "",
    zipcode: "",
  });

  const userId =
    user?.sub.split("google-oauth2|")[1] || user?.sub.split("auth0|")[1];

  function getUserData() {
    axios
      .get(`api/users/users?user_id=${userId}`)
      .then((result) => setUserProfile(result.data[0], "result"))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUserData();
  }, [userId, userProfile]);

  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <span className="navbar-header">
          <FontAwesomeIcon icon={faPaw} className="fa-paw" />
          <h1 className="navbar-title">BARK</h1>
        </span>
      </Link>
      <section className="add-user-section">
        {!userProfile && <AddUser />}
        {userProfile && (
          <>
            <span className="nav-name">{userProfile.name}</span>
            <img
              src={userProfile.photo}
              alt="puppy-photo"
              className="nav-photo"
            />
          </>
        )}
      </section>
    </nav>
  );
}

export default Navbar;
