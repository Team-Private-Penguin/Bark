import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack } from "@mantine/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function UserModal({ clicked, userId }) {
  const [currStatus, setCurrStatus] = useState("notFriends");
  const [list, setList] = useState({});
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

  console.log(userProfile, "friends user profile");

  useEffect(() => {
    const promises = [
      axios.get(`/api/friend/${userId}/${clicked.user_id}`),
      axios.get(`/api/friend/${clicked.user_id}/${userId}`),
      axios.get(`api/users/users?user_id=${userId}`),
    ];
    Promise.all(promises).then((res) => {
      setList({ user: res[0].data.length, friend: res[1].data.length });
      setUserProfile(res[2].data[0]);
    });
  }, [clicked, currStatus]);

  useEffect(() => {
    if (list.user === 0 && list.friend === 0) {
      setCurrStatus("notFriends");
    } else if (list.user === 1 && list.friend === 1) {
      setCurrStatus("friends");
    } else if (list.user === 1 && list.friend === 0) {
      setCurrStatus("sent");
    } else {
      setCurrStatus("accept");
    }
    if (clicked.user_id === userId) {
      setCurrStatus("self");
    }
  }, [list, currStatus]);

  const handleClick = () => {
    axios
      .post("/api/friend/1", { user: userId, friend: clicked.user_id })
      .then(() => setCurrStatus("request"));
  };
  return (
    <>
      <Stack>
        <section className="user-container">
          <h1 className="dog-name">
            <span className="friend-dog-name-text">{userProfile?.name}</span>
          </h1>
          {userProfile?.photo && (
            <img
              src={userProfile?.photo}
              alt="puppy-photo"
              className="friend-puppy-photo"
            />
          )}
          {userProfile?.name && (
            <ul className="prop-list">
              <li className="friend-prop">
                <FontAwesomeIcon
                  icon={faPaw}
                  className="fa-paw-icons friend-inline-paw"
                />
                Size: {userProfile?.size}
              </li>
              <li className="friend-prop">
                <FontAwesomeIcon
                  icon={faPaw}
                  className="fa-paw-icons friend-inline-paw"
                />
                Energy Level: {userProfile?.energy}
              </li>
              <li className="friend-prop">
                <FontAwesomeIcon
                  icon={faPaw}
                  color="red"
                  className="fa-paw-icons friend-inline-paw"
                />
                Friendly to people: {userProfile?.f_people}
              </li>
              <li className="friend-prop">
                <FontAwesomeIcon
                  icon={faPaw}
                  className="fa-paw-icons friend-inline-paw"
                />
                Friendly to dogs: {userProfile?.f_dogs}
              </li>
            </ul>
          )}
        </section>
        {currStatus === "notFriends" && (
          <Button className="bg-slate-800 text-white" onClick={handleClick}>
            Add friend
          </Button>
        )}
        {currStatus === "friends" && <span>Friends</span>}
        {currStatus === "sent" && <span>Request Sent</span>}
        {currStatus === "self" && <span></span>}
        {currStatus === "accept" && (
          <Button className="bg-slate-800 text-white" onClick={handleClick}>
            Accept Friend Request
          </Button>
        )}
      </Stack>
    </>
  );
}

export default UserModal;
