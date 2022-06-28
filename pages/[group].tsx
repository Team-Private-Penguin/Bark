import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventFeed from "../components/EventFeed";
import AddEvent from "../components/AddEvent";
import { Button, Group, Stack } from "@mantine/core";
import GroupsComp from "../components/AddGroup";
import UserInfo from "../components/Users/UserInfo";
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
          <div className="border h-[54vh] space shadows cursor-pointer homeBox">
            <h2>🐶 Groups</h2>
            <GroupsComp />
          </div>
        </Stack>
        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[84vh] shadows">
            <div className="sticky top-0 z-50">
              <h2>
                <Group className="justify-between">
                  {" "}
                  <span>🐶 Group {id}</span> <Button> Join Group </Button>
                </Group>
              </h2>
              <AddEvent />
            </div>
            <EventFeed />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <div className="border h-[84vh] space shadows cursor-pointer">
            <h2>🐶 Group Members</h2>
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
