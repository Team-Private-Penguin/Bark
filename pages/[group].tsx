import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
import { Button, Group, Stack } from "@mantine/core";
import UserInfo from "../components/Users/UserInfo";
import GroupsComp from "../components/AddGroup";
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
  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }
  // const TempUserId = 1;
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
      console.log("join check", data.data[0].rows);
      if (
        data.data[0].rows.filter((obj: { group_id: string }) => {
          return obj["group_id"] === id;
        }).length
      ) {
        setJoined(true);
      }
    });
  }, []);
  return (
    <main className="min-h-screen w-screen">
      <Navbar />
      <Group className="group">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[28vh] space shadows ">
            <h2 className="section-title">🐶 User Info</h2>
            {user && <User />}
            {!user && (
              <div className="centered">Please add your pet above!</div>
            )}
          </div>
          <div className="border h-[54vh] space shadows cursor-pointer homeBox">
            <h2>🐶 Groups</h2>
            <Stack>
              <ExploreGroups />
              <AddGroup />
              <GroupList />
            </Stack>
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[84vh] shadows">
            <div className="sticky top-0 z-50">
              <h2>
                <Group className="justify-between">
                  {" "}
                  <span>🐶 {groupDetails.name}</span>{" "}
                  {joined ? null : (
                    <Button onClick={joinGroup}> Join Group </Button>
                  )}
                </Group>
              </h2>
              <AddEvent />
            </div>
            <EventFeed userFeed={false} />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <Stack className="border h-[84vh] space shadows gap-0">
            <h2>🐶 Group Members</h2>
            <Friends groupId={id} listType={"groups"} />
          </Stack>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
