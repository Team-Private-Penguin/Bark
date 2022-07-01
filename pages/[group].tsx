import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
import { Button, Group, ScrollArea, Stack } from "@mantine/core";
import UserInfo from "../components/Users/UserInfo";
import Navbar from "../components/Navbar";
import User from "../components/Users/User";
import axios from "axios";
import Friends from "../components/Friends/Friends";
import { useUser } from "@auth0/nextjs-auth0";
import GroupList from "../components/GroupList";
import AddGroup from "../components/AddGroup";
import ExploreGroups from "../components/ExploreGroups";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faCat,
  faOtter,
  faFishFins,
} from "@fortawesome/free-solid-svg-icons";

const Groups = () => {
  const { user } = useUser();
  const [joined, setJoined] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [eventCounter, setEventCounter] = useState(0);
  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }

  const {
    query: { id },
  } = useRouter();
  const [currentGroups, setCurrentGroups] = useState([]);
  const [groupDetails, setGroupDetails] = useState([{}]);
  const [updateFriends, setUpdateFriends] = useState(false);

  function getGroupDetails() {
    axios
      .get(`/api/groups?id=${id}`)
      .then((data) => setGroupDetails(data.data[0].rows[0]))
      .catch((err) => console.log(err));
  }

  function joinGroup() {
    if (!joined) {
      let values = { user_id: userId, group_id: id };
      axios
        .post("/api/usergroup", values)
        .then(() => {
          let values = { user_id: userId };
          return axios
            .get(`/api/usergroup?user_id=${userId}`)
            .then((data) => setCurrentGroups(data.data[0].rows))
            .then(() => setJoined(true))
            .then(() => setGroupCount(groupCount + 1));
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    getGroupDetails();
    setJoined(false);
    axios.get(`/api/usergroup?user_id=${userId}`).then((data) => {
      //console.log("join check", data.data[0]);
      if (
        data.data[0].rows.filter((obj: { group_id: string }) => {
          return obj["group_id"] === id;
        }).length
      ) {
        setJoined(true);
      }
    });
  }, [userId, id]);
  return (
    <main className="min-h-screen w-screen">
      <Navbar setUpdateFriends={setUpdateFriends} />
      <Group className="group">
        <Stack
          justify="flex-start"
          className="hidden lg:flex"
          style={{ width: "20%" }}
        >
          <div className="border h-[28vh] space shadows homeBox ">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faDog} className="fa-header-icons" />
              User Info
            </h2>
            {user && <User />}
            {!user && (
              <div className="centered">Please add your pet above!</div>
            )}
          </div>
          <div className="border h-[60vh] space shadows homeBox">
            <h2>
              <FontAwesomeIcon icon={faCat} className="fa-header-icons" />{" "}
              Groups
            </h2>
            <Stack>
              <Group position="center" className="mt-2">
                <ExploreGroups />
                <AddGroup
                  groupCount={groupCount}
                  setGroupCount={setGroupCount}
                />
              </Group>
              <GroupList
                groupCount={groupCount}
                currentGroups={currentGroups}
              />
            </Stack>
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[90vh] shadows">
            <div className="sticky top-0 z-50">
              <h2>
                <Group>
                  {" "}
                  <span className="center-feed">
                    <FontAwesomeIcon
                      icon={faOtter}
                      className="fa-header-icons"
                    />{" "}
                    {groupDetails.name}
                  </span>{" "}
                </Group>
              </h2>
              <Group position="center">
                {joined ? (
                  <AddEvent
                    joined={joined}
                    eventCount={eventCounter}
                    setCount={setEventCounter}
                  />
                ) : (
                  <Button
                    disabled={joined}
                    onClick={joinGroup}
                    className="teal-btn"
                  >
                    {" "}
                    Join Group{" "}
                  </Button>
                )}
              </Group>
            </div>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={8}
              className="mt-2"
              style={{ height: "80vh" }}
            >
              <EventFeed
                group={id}
                eventCount={eventCounter}
                userFeed={false}
              />
            </ScrollArea>
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <Stack className="border h-[90vh] space shadows homeBox gap-0">
            <h2>
              <FontAwesomeIcon icon={faFishFins} className="fa-header-icons" />{" "}
              Group Members
            </h2>
            <Friends groupCount={groupCount} groupId={id} listType={"groups"} />
          </Stack>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
