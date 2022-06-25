import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="">
      <main className="min-h-screen w-screen p-5">
        <Group>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh] ">
              <h2 className="title-text">User Info</h2>
            </div>
            <div className="border-2 border-black h-[60vh]">
              <Link href="/groups" passHref>
                <h2 className="title-text">Groups</h2>
              </Link>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "2" }}>
            <div className="border-2 border-black h-[95vh]">
              <h2 className="title-text">Events</h2>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh]">
              <h2 className="title-text">Friends</h2>
            </div>
            <div className="border-2 border-black h-[60vh]">
              <h2 className="title-text">Map</h2>
            </div>
          </Stack>
        </Group>
      </main>
    </div>
  );
};

export default Home;
