import React from "react";
import Link from "next/link";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
import { Group, Stack } from "@mantine/core";
import GroupsComp from "../components/Groups";
import UserInfo from "../components/UserInfo";
import Navbar from "../components/Navbar";

const Groups = () => {
  return (
    <main className="min-h-screen w-screen">
      <Navbar />
      <Group className="group">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[28vh] space shadows ">
            <h2>🐶 User Info</h2>
            <UserInfo />
          </div>
          <div className="border h-[60vh] space shadows cursor-pointer homeBox">
            <h2>🐶 Groups</h2>
            <GroupsComp />
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[90vh] shadows overflow-auto">
            <div className="sticky top-0 z-50">
              <h2>🐶 Feed</h2>
              <AddEvent />
            </div>
            <EventFeed />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <div className="border h-[90vh] space shadows cursor-pointer">
            <h2>🐶 Group Members</h2>
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
