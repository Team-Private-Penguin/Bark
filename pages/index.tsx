import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, ScrollArea, Stack } from "@mantine/core";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Friends from "../components/Friends/Friends";
import AddGroup from "../components/AddGroup";
import GroupList from "../components/GroupList";
import ExploreGroups from "../components/ExploreGroups";
import EventFeed from "../components/EventFeed";
import User from "../components/Users/User";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const Home: NextPage = () => {
  const { user } = useUser();
  return (
    <>
      <main className="min-h-screen w-screen ">
        <Navbar />
        <Group className="group">
          <Stack justify="flex-start" style={{ width: "20%" }}>
            <div className="border h-[28vh] space shadows homeBox">
              <h2 className="section-title">🐶 User Info</h2>
              {user && <User />}
              {!user && (
                <div className="centered">Please add your pet above!</div>
              )}
            </div>
            <div className="border h-[60vh] space shadows homeBox">
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
              <h2 className="sticky top-0 z-50">🐶 Events</h2>
              <EventFeed userFeed={true} />
            </div>
          </Stack>

          <Stack style={{ width: "20%" }}>
            <Stack className="border h-[28vh] space shadows homeBox gap-0">
              <h2>🐶 Friends</h2>
              <Friends listType={"friends"} />
            </Stack>
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

export const getServerSideProps = withPageAuthRequired();
