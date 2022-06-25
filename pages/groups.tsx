import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Group, Stack } from "@mantine/core";



const Groups = () => {
  return (
  <div className="min-h-screen w-screen p-5">
    <Group position="apart" spacing="xl" >
      <Stack style={{flexGrow: '1'}}>
        <div className="border-2 border-black h-[33vh]">User Info</div>
        <div className="border-2 border-black h-[60vh]">Groups</div>
      </Stack>
      <Stack style={{flexGrow: '2'}}>
        <div className="border-2 border-black h-[95vh]">Events</div>
      </Stack>
      <Stack style={{flexGrow: '1'}}>
        <div className="border-2 border-black h-[33vh]">Group Members</div>
        <div className="border-2 border-black h-[60vh]" >Map</div>
      </Stack>
    </Group>
  </div>
  );
};

export default Groups;