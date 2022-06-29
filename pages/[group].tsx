import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
import { Button, Group, Stack } from "@mantine/core";
import GroupsComp from "../components/AddGroup";
import UserInfo from "../components/Users/UserInfo";
import Navbar from "../components/Navbar";
import AddUser from "../components/Users/AddUser";
import axios from "axios";
import Friends from "../components/Friends/Friends";
import { useUser } from "@auth0/nextjs-auth0";

const Groups = () => {
  const { user } = useUser();
  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }
  // const TempUserId = 1;
  const {
    query: { id },
  } = useRouter();
  const [currentGroups, setCurrentGroups] = useState([]);

  function joinGroup() {
    let values = { user_id: userId, group_id: id };
    axios
      .post("/api/usergroup", values)
      .then(() => {
        let values = { user_id: userId };
        return axios
          .get(`/api/usergroup?user_id=${userId}`)
          .then((data) => setCurrentGroups(data.data[0].rows));
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="min-h-screen w-screen">
      <Navbar />
      <Group className="group">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[28vh] space shadows ">
            <h2 className="section-title">🐶 User Info</h2>
            <UserInfo />
            <AddUser />
          </div>
          <div className="border h-[54vh] space shadows cursor-pointer homeBox">
            <h2>🐶 Groups</h2>
            <GroupsComp />
            {currentGroups.map(
              (
                group: { group_id: number; name: string; description: string },
                index: number
              ) => (
                <Link href={`/group?id=${group.group_id}`} passHref>
                  <Group key={index}>
                    {" "}
                    {group.name} {group.description}{" "}
                  </Group>
                </Link>
              )
            )}
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[84vh] shadows">
            <div className="sticky top-0 z-50">
              <h2>
                <Group className="justify-between">
                  {" "}
                  <span>🐶 Group {id}</span>{" "}
                  <Button onClick={joinGroup}> Join Group </Button>
                </Group>
              </h2>
              <AddEvent />
            </div>
            <EventFeed />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <Stack className="border h-[84vh] space shadows gap-0">
            <h2>🐶 Group Members</h2>
            <Friends groupId={id} listType={'groups'}/>
          </Stack>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
