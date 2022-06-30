import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Spoiler } from "@mantine/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import EditUser from "./EditUser";

function User() {
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
    axios.get(`api/users/users?user_id=${userId}`).then((result) => {
      setUserProfile(result.data[0]);
    });
  }

  useEffect(() => {
    getUserData();
  }, [userId]);
  return (
    <section className="user-container">
      <h1 className="dog-name">
        <span className="dog-name-text">{userProfile?.name}</span>
        {!userProfile?.name ? (
          <div className="centered">Please add your pet above!</div>
        ) : (
          <span>
            <EditUser />
          </span>
        )}
      </h1>
      {userProfile?.photo && (
        <img
          src={userProfile?.photo}
          alt="puppy-photo"
          className="puppy-photo"
        />
      )}
      {userProfile?.name && (
        <Spoiler maxHeight={0} showLabel="Show more" hideLabel="Hide">
          <ul className="prop-list">
            <li className="dog-prop">
              <FontAwesomeIcon
                icon={faPaw}
                className="fa-paw-icons inline-paw"
              />
              Size: {userProfile?.size}
            </li>
            <li className="dog-prop">
              <FontAwesomeIcon
                icon={faPaw}
                className="fa-paw-icons inline-paw"
              />
              Energy Level: {userProfile?.energy}
            </li>
            <li className="dog-prop">
              <FontAwesomeIcon
                icon={faPaw}
                className="fa-paw-icons inline-paw"
              />
              Friendly to people: {userProfile?.f_people}
            </li>
            <li className="dog-prop">
              <FontAwesomeIcon
                icon={faPaw}
                className="fa-paw-icons inline-paw"
              />
              Friendly to dogs: {userProfile?.f_dogs}
            </li>
          </ul>
        </Spoiler>
      )}
    </section>
  );
}

export default User;
