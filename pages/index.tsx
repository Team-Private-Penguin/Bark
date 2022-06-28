import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import UserInfo from "../components/Users/UserInfo";
import Navbar from "../components/Navbar";
import Friends from "../components/Friends/Friends";
import AddGroup from "../components/AddGroup";
import GroupList from "../components/GroupList";
import ExploreGroups from "../components/ExploreGroups";

const Home: NextPage = () => {
  return (
    <>
      <main className="min-h-screen w-screen ">
        <Navbar />
        <Group className="group">
          <Stack justify="flex-start" style={{ width: "20%" }}>
            <div className="border h-[28vh] space shadows homeBox">
              <h2 className="section-title">🐶 User Info</h2>
              <UserInfo />
            </div>
            <div className="border h-[60vh] space shadows cursor-pointer homeBox">
              <h2>🐶 Groups</h2>
              <Stack>
                <ExploreGroups />
                <AddGroup />
                <GroupList />
              </Stack>
            </div>
          </Stack>

          <Stack style={{ flexGrow: 1 }}>
            <div className="border h-[90vh] shadows homeBox">
              <h2 className="section-title">🐶 Events</h2>
            </div>
          </Stack>

          <Stack style={{ width: "20%" }}>
            <div className="border h-[28vh] space shadows homeBox">
              <h2>🐶 Friends</h2>
              <Friends />
            </div>
            <div className="border h-[60vh] space shadows cursor-pointer homeBox">
              <Link href="/map" passHref>
                <h2 className="section-title">🐶 Map</h2>
              </Link>
            </div>
          </Stack>
        </Group>
      </main>
    </>
  );
};

export default Home;
