import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import Friends from '../components/Friends'

const Home: NextPage = () => {
  return (
    <main className="min-h-screen w-screen p-5">
      <Group position="apart" className="Group">
        <Stack style={{ width: "20%" }}>
          <div className="border h-[33vh] shadows">
            <h2>🐶 User Info</h2>
          </div>
          <div className="border h-[60vh] shadows cursor-pointer">
            <Link href="/groups" passHref>
              <h2>🐶 Groups</h2>
            </Link>
          </div>
        </Stack>
        <Stack style={{ flexGrow: "1" }}>
          <div className="border h-[95vh] shadows">
            <h2>🐶 Events</h2>
          </div>
        </Stack>
        <Stack style={{ width: "20%" }}>
          <div className="border h-[95vh] shadows">
            <h2>🐶 Friends</h2>
            <Friends></Friends>
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Home;
