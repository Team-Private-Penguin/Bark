import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import UserInfo from "../components/Users/UserInfo";
import Navbar from "../components/Navbar";
import Chats from "../components/Chats/Chat.js";

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
              <Link href="/groups" passHref>
                <h2 className="section-title">🐶 Groups</h2>
              </Link>
            </div>
          </Stack>

          <Stack style={{ flexGrow: 1 }}>
            <div className="border h-[90vh] shadows homeBox">
              <h2 className="section-title">🐶 Events</h2>
            </div>
          </Stack>

          <Stack style={{ width: "20%" }}>
            <div className="border h-[28vh] space shadows homeBox">
              <h2 className="section-title">🐶 Friends</h2>
              <Chats />
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
