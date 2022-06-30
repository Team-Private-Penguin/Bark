import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faBell } from "@fortawesome/free-solid-svg-icons";
import AddUser from "./Users/AddUser";
import { ActionIcon, Popover } from "@mantine/core";
import Requests from "./Friends/Requests";
import Input from "./Autocomplete";
function Navbar({ setUpdateFriends }) {
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
  const [opened, setOpened] = useState(false);
  const [requests, setRequests] = useState([]);
  const [updateList, setUpdateList] = useState(0);

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
    if (userId) {
      axios.get(`/api/requests/${userId}`).then((res) => setRequests(res.data));
    }
  }, [userId, updateList]);
  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <span className="navbar-header">
          <FontAwesomeIcon icon={faPaw} className="fa-paw" />
          <h1 className="navbar-title">BARK</h1>
        </span>
      </Link>
      <Input userId={userId} />
      <section className="add-user-section">
        <Link href="/map" passHref>
          <h2>🐶 Map</h2>
        </Link>
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <ActionIcon onClick={() => setOpened((o) => !o)}>
              <FontAwesomeIcon icon={faBell} className="w-[75%]" />
            </ActionIcon>
          }
          position="bottom"
          withCloseButton
          width={260}
          title="Friend Requests"
        >
          <Requests
            userId={userId}
            setUpdateList={setUpdateList}
            requests={requests}
            setUpdateFriends={setUpdateFriends}
          />
        </Popover>
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
