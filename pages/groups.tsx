import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";

const Groups = () => {
  return (
    <div className="">
      <main className="min-h-screen w-screen p-5">
        <Group>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh] ">
              <h2 className="title-text">User Info</h2>
            </div>
            <div className="border-2 border-black h-[60vh]">
              <h2 className="title-text">Groups</h2>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "2" }}>
            <div className="border-2 border-black h-[95vh]">
              <h2 className="title-text">Feed</h2>
            </div>
          </Stack>
          <Stack style={{ flexGrow: "1" }}>
            <div className="border-2 border-black h-[33vh]">
              <h2 className="title-text">Group Members</h2>
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

export default Groups;
