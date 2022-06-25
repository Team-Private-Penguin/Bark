import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="">
      <main className="min-h-screen w-screen p-5">
        <Group position="apart">
          <Stack style={{ width: "20%" }}>
            <div className="border-2 border-black h-[33vh] ">
              <h2>User Info</h2>
            </div>
            <div className="border-2 border-black h-[60vh]">
              <Link href="/groups" passHref>
                <h2>Groups</h2>
              </Link>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[95vh]">
              <h2>Events</h2>
            </div>
          </Stack>
          <Stack style={{ width: "20%" }}>
            <div className="border-2 border-black h-[33vh]">
              <h2>Friends</h2>
            </div>
            <div className="border-2 border-black h-[60vh]">
              <Link  href="/map" passHref>
                <h2>Map</h2>
              </Link>
            </div>
          </Stack>
        </Group>
      </main>
    </div>
  );
};

export default Home;
