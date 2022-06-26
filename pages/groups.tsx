import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Post from "../components/Post";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Link from "next/link";
import { useState } from "react";
import { stateData } from "../components/statedata.js";
import { useForm } from "@mantine/form";
import AddPost from "../components/AddPost";
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
            <AddPost />
            <Post image={true} />
            <Post image={false} />
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
