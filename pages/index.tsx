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
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faCat,
  faDove,
  faOtter,
} from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  const [groupCount, setGroupCount] = useState(0);
  const { user } = useUser();
  let userId =
    user?.sub.split("google-oauth2|")[1] || user?.sub.split("auth0|")[1];
  const [updateFriends, setUpdateFriends] = useState(false);
  return (
    <>
      <main className="min-h-screen w-screen ">
        <Navbar setUpdateFriends={setUpdateFriends} />
        <Group className="group">
          <Stack justify="flex-start" style={{ width: "20%" }}>
            <div className="border h-[28vh] space shadows homeBox">
              <h2 className="section-title">
                <FontAwesomeIcon icon={faDog} className="fa-header-icons" />
                User Info
              </h2>

              {user && <User />}
            </div>
            <div className="border h-[60vh] space shadows homeBox">
              <h2>
                <FontAwesomeIcon icon={faCat} className="fa-header-icons" />{" "}
                Groups
              </h2>
              <Stack>
                <ExploreGroups />
                <AddGroup
                  groupCount={groupCount}
                  setGroupCount={setGroupCount}
                />
                <GroupList groupCount={groupCount} />
              </Stack>
            </div>
          </Stack>

          <Stack style={{ flexGrow: 1 }}>
            <div className="border h-[90vh] shadows homeBox">
              <h2 className="sticky top-0 z-50">
                <FontAwesomeIcon icon={faOtter} className="fa-header-icons" />{" "}
                Events
              </h2>
              <ScrollArea
                offsetScrollbars
                scrollbarSize={8}
                className="mt-2"
                style={{ height: "82vh" }}
              >
                <EventFeed userFeed={true} />
              </ScrollArea>
            </div>
          </Stack>

          <Stack style={{ width: "20%" }}>
            <Stack className="border h-[90vh] space shadows homeBox gap-0">
              <h2>
                <FontAwesomeIcon icon={faDove} className="fa-header-icons" />{" "}
                Friends
              </h2>
              <Friends updateFriends={updateFriends} listType={"friends"} />
            </Stack>
          </Stack>
        </Group>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuthRequired();
