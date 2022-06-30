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
            .then(() => setJoined(true));
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    getGroupDetails();
    axios.get(`/api/usergroup?user_id=${userId}`).then((data) => {
      console.log("join check", data.data[0]);
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
      <Navbar />
      <Group className="group">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[34vh] space shadows ">
            <h2 className="section-title">🐶 User Info</h2>
            {user && <User />}
            {!user && (
              <div className="centered">Please add your pet above!</div>
            )}
          </div>
          <div className="border h-[54vh] space shadows homeBox">
            <h2>🐶 Groups</h2>
            <Stack>
              <ExploreGroups />
              <AddGroup groupCount={groupCount} setGroupCount={setGroupCount} />
              <GroupList groupCount={groupCount} />
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
                    🐶 {groupDetails.name}
                  </span>{" "}
                  {joined ? null : (
                    <Button onClick={joinGroup}> Join Group </Button>
                  )}
                </Group>
              </h2>
              <AddEvent
                joined={joined}
                eventCount={eventCounter}
                setCount={setEventCounter}
              />
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
          <Stack className="border h-[90vh] space shadows gap-0">
            <h2>🐶 Group Members</h2>
            <Friends groupId={id} listType={"groups"} />
          </Stack>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
