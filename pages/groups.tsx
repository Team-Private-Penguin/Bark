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
import { stateData } from "./statedata.js";
import { useForm } from "@mantine/form";

const Groups = () => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      eventName: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      description: "",
      date: "",
      prospective: false,
      img_url: "",
    },
  });

  const submitEvent = (values: {
    eventName: string;
    address_1: string;
    address_2: string;
    city: string;
    date: Date;
    description: string;
    prospective: boolean;
    state: string;
    zipcode: string;
    img_url: string;
  }) => {
    const submission = {
      eventName: values.eventName,
      address: `${values.address_1}${
        values.address_2 ? values.address_2 : ""
      }, ${values.city}, ${values.state} ${values.zipcode}`,
      date: values.date,
      description: values.description,
      prospective: values.prospective,
    };
    console.log("big moves", submission);
  };
  return (
    <main className="min-h-screen w-screen p-5">
      <Group className="Group" position="apart">
        <Stack className="hidden lg:flex" style={{ width: "20%" }}>
          <div className="border h-[33vh] ">
            <h2>🐶 User Info</h2>
          </div>
          <div className="border h-[60vh]">
            <h2>🐶 Groups</h2>
          </div>
        </Stack>
        <Stack style={{ flexGrow: "1" }}>
          <div className="border flex-column h-[95vh]">
            <h2>🐶 Feed</h2>
            <Post />
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Create New Event!"
            >
              {/* Modal content */}
              <form onSubmit={form.onSubmit((values) => submitEvent(values))}>
                <TextInput
                  placeholder="Event Name"
                  label="Event name"
                  required
                  {...form.getInputProps("eventName")}
                />
                <TextInput
                  placeholder="Address Line 1"
                  label="Address Line 1"
                  required
                  {...form.getInputProps("address_1")}
                />
                <TextInput
                  placeholder="Address Line 2"
                  label="Address Line 2"
                  {...form.getInputProps("address_2")}
                />
                <TextInput
                  placeholder="City"
                  label="City"
                  required
                  {...form.getInputProps("city")}
                />
                <Select
                  label="State"
                  placeholder="Select one"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={stateData}
                  {...form.getInputProps("state")}
                />
                <TextInput
                  placeholder="Zip Code"
                  label="Zip Code"
                  required
                  {...form.getInputProps("zipcode")}
                />
                <Textarea
                  placeholder="Description"
                  label="Description"
                  required
                  {...form.getInputProps("description")}
                />
                <DatePicker
                  placeholder="Pick date"
                  label="Event date"
                  required
                  {...form.getInputProps("date")}
                />
                <Checkbox
                  label="Prospective?"
                  {...form.getInputProps("prospective")}
                />
                <Group position="right" mt="md">
                  <Button color="dark" type="submit">
                    Submit
                  </Button>
                </Group>
              </form>
            </Modal>

            <Group position="center">
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={() => setOpened(true)}
              >
                Open Modal
              </Button>
            </Group>
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
