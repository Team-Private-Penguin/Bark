import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Button, Collapse } from "@mantine/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { withRouter } from "next/router";

function User() {
  const { user } = useUser();
  const [opened, setOpen] = useState(false);
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
  const [imgSize, setImgSize] = useState({
    height: "130px",
    width: "130px",
  });
  const [text, setText] = useState({
    color: "rgb(59, 59, 59)",
  });

  const userId =
    user?.sub.split("google-oauth2|")[1] || user?.sub.split("auth0|")[1];

  function getUserData() {
    axios.get(`api/users/users?user_id=${userId}`).then((result) => {
      setUserProfile(result.data[0]);
    });
  }

  function changeSize(image) {
    if (opened) {
      setImgSize({
        height: "130px",
        width: "130px",
      });
    } else {
      setImgSize({
        height: "40px",
        width: "40px",
      });
    }
  }

  function changeText() {
    //nonf
    if (opened) {
      setText({
        color: "rgb(0,0,0)",
      });
    } else {
      setText({
        color: "rgb(59, 59, 59)",
      });
    }
  }

  useEffect(() => {
    getUserData();
  }, [userId]);
  return (
    <section className="user-container">
      <h1 className="dog-name">
        <span className="dog-name-text">{userProfile?.name}</span>
        {!userProfile?.name ? (
          <span>
            <AddUser />
          </span>
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
          style={imgSize}
        />
      )}
      {userProfile?.name && (
        <>
          {!opened ? (
            <Button
              variant="outline"
              className="hide-btn"
              onClick={() =>
                setOpen((o) => {
                  !o;
                  setOpen(!opened);
                  changeSize(imgSize);
                  changeText();
                })
              }
            >
              See characteristics
            </Button>
          ) : (
            <Button
              variant="outline"
              className="hide-btn"
              onClick={() =>
                setOpen((o) => {
                  !o;
                  setOpen(!opened);
                  changeSize(imgSize);
                })
              }
            >
              Hide characteristics
            </Button>
          )}

          <Collapse
            in={opened}
            transitionDuration={700}
            transitionTimingFunction="linear"
          >
            <ul className="prop-list" style={text}>
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
          </Collapse>
        </>
      )}
    </section>
  );
}

export default User;
