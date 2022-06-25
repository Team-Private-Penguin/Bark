import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Bark</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        />
      </Head>
      <main className="min-h-screen w-screen p-5">
        <Group position="apart" spacing="xl">
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh]">User Info</div>
            <div className="border-2 border-black h-[60vh]">
              <Link  href="/groups" passHref>
                <span>Groups</span>
              </Link>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "2" }}>
            <div className="border-2 border-black h-[95vh]">Feed</div>
          </Stack>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh]">Friends</div>
            <div className="border-2 border-black h-[60vh]">Map</div>
          </Stack>
        </Group>
      </main>
    </div>
  );
};

export default Home;
