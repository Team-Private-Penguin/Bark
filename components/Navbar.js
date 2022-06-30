import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddUser from "./Users/AddUser";
import { ActionIcon, Indicator, Popover } from "@mantine/core";
import { faPaw, faBell, faEarthAsia } from "@fortawesome/free-solid-svg-icons";
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
  const [signOut, setSignOut] = useState(false);
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
        <Link href="/map_page" passHref>
          <span className="globe-cont">
            <FontAwesomeIcon icon={faEarthAsia} className="globe" />
          </span>
        </Link>
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <ActionIcon
              variant="filled"
              className="m-1 bell-hover"
              onClick={() => setOpened((o) => !o)}
            >
              <Indicator
                position="top-end"
                color="red"
                size={15}
                offset={2}
                label={requests.length}
                className="bell"
              >
                <FontAwesomeIcon icon={faBell} className="w-[75%] bell" />
              </Indicator>
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

        <span className="nav-name">{userProfile?.name}</span>

        <Popover
          opened={signOut}
          onClose={() => setSignOut(false)}
          target={
            <img
              src={
                userProfile?.photo ||
                "https://res.cloudinary.com/dppbuevux/image/upload/v1656609122/puppy2_gqbggt.jpg"
              }
              alt="puppy-photo"
              className="nav-photo"
              onClick={() => setSignOut(true)}
            />
          }
          position="bottom"
          withCloseButton
          width={260}
          title="Sign Out"
        >
          <a href="/api/auth/logout">
            <button className="bg-transparent hover:bg-accent text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
              Logout
            </button>
          </a>
        </Popover>
      </section>
    </nav>
  );
}

export default Navbar;
