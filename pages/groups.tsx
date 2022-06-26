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
import UserInfo from "../components/UserInfo";
import Navbar from "../components/Navbar";

const Groups = () => {
  return (
    <main className="min-h-screen w-screen">
      <Navbar />
      <Group className="group">
        <Stack justify="flex-start" style={{ width: "20%" }}>
          <div className="border h-[28vh] space shadows ">
            <h2>🐶 User Info</h2>
            <UserInfo />
          </div>
          <div className="border h-[60vh] space shadows cursor-pointer">
            <h2>🐶 Groups</h2>
            <GroupsComp />
          </div>
        </Stack>

        <Stack style={{ flexGrow: 1 }}>
          <div className="border h-[90vh] shadows">
            <h2>🐶 Feed</h2>
            <AddPost />
            <Post image={true} />
            <Post image={false} />
          </div>
        </Stack>
        <Stack style={{ width: "20%" }}>
          <div className="border h-[90vh] space shadows cursor-pointer">
            <h2>🐶 Group Members</h2>
          </div>
        </Stack>
      </Group>
    </main>
  );
};

export default Groups;
