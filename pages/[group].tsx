import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
<<<<<<< HEAD:pages/groups.tsx
import { Group, Stack } from "@mantine/core";
import GroupsComp from "../components/Groups";
import UserInfo from "../components/Users/UserInfo";
=======
import { Button, Group, Stack } from "@mantine/core";
import GroupsComp from "../components/AddGroup";
import UserInfo from "../components/UserInfo";
>>>>>>> 09d8bc0a26e9ac9297d7aecb509f941187a9d174:pages/[group].tsx
import Navbar from "../components/Navbar";
import AddUser from "../components/Users/AddUser";

const Groups = () => {
  const {
    query: { id },
  } = useRouter();

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
<<<<<<< HEAD:pages/groups.tsx
          <div className="border h-[60vh] space shadows cursor-pointer homeBox">
            <h2 className="section-title">🐶 Groups</h2>
=======
          <div className="border h-[54vh] space shadows cursor-pointer homeBox">
            <h2>🐶 Groups</h2>
>>>>>>> 09d8bc0a26e9ac9297d7aecb509f941187a9d174:pages/[group].tsx
            <GroupsComp />
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
<<<<<<< HEAD:pages/groups.tsx
          <div className="border h-[90vh] shadows overflow-auto ">
            <div className="sticky top-0 z-50 ">
              <h2 className="section-title ">🐶 Feed</h2>
=======
          <div className="border h-[84vh] shadows">
            <div className="sticky top-0 z-50">
              <h2>
                <Group className="justify-between">
                  {" "}
                  <span>🐶 Group {id}</span> <Button> Join Group </Button>
                </Group>
              </h2>
>>>>>>> 09d8bc0a26e9ac9297d7aecb509f941187a9d174:pages/[group].tsx
              <AddEvent />
            </div>
            <EventFeed />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
<<<<<<< HEAD:pages/groups.tsx
          <div className="border h-[90vh] space shadows cursor-pointer">
            <h2 className="section-title">🐶 Group Members</h2>
=======
          <div className="border h-[84vh] space shadows cursor-pointer">
            <h2>🐶 Group Members</h2>
>>>>>>> 09d8bc0a26e9ac9297d7aecb509f941187a9d174:pages/[group].tsx
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
