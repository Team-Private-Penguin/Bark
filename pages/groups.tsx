import React from "react";
import Link from "next/link";
import EventCard from "../components/EventCard";
import { Group, Stack } from "@mantine/core";
import AddEvent from "../components/AddEvent";
import GroupsComp from "../components/Groups";

const Groups = () => {
  return (
    <main className="min-h-screen w-screen p-5">
      <Group className="Group" position="apart">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[33vh] ">
            <h2>🐶 User Info</h2>
          </div>
          <div className="border h-[60vh]">
            <h2>🐶 Groups</h2>
            <GroupsComp />
          </div>
        </Stack>
        <Stack style={{ flexGrow: "1" }}>
          <div className="border flex-column h-[95vh]">
            <h2>🐶 Feed</h2>
            <AddEvent />
            {/* .map of Events */}
            <EventCard image={true} />
            <EventCard image={false} />
          </div>
        </Stack>
        <Stack className="hidden xl:flex" style={{ width: "20%" }}>
          <div className="border h-[95vh]">
            <h2>🐶 Group Members</h2>
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
