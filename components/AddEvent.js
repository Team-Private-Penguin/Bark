import Image from "next/image";
import Post from "./EventCard";
import axios from "axios";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Textarea,
  TextInput,
  Input,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import Link from "next/link";
import React, { useState } from "react";
import { stateData } from "./statedata.js";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import ImageDropzone from "./Users/Dropzone";

function AddEvent({ joined, setCount, eventCount }) {
  const { user } = useUser();
  const user_id = user?.sub.split("google-oauth2|")[1];
  const [image, setImage] = useState("");

  const [opened, setOpened] = useState(false);
  const {
    query: { id },
  } = useRouter();
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
      img_url: image,
    },
  });
  const submitEvent = (values) => {
    const submission = {
      group_id: id,
      name: values.eventName,
      address: `${values.address_1}${
        values.address_2 ? values.address_2 : ""
      }, ${values.city}, ${values.state} ${values.zipcode}`,
      date: values.date,
      description: values.description,
      prospective: values.prospective,
      img_url: image,
      owner_id: user_id,
    };
    axios
      .post("/api/events", submission)
      .then(() => {
        setOpened(false);
      })
      .then(() => {
        setCount(eventCount + 1);
      });
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Event!"
      >
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
          <ImageDropzone setImage={setImage} />
          <Checkbox
            label="Prospective?"
            {...form.getInputProps("prospective")}
          />
          <Group position="right" mt="md">
            <Button className="bg-slate-800" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button
          disabled={!joined}
          className="bg-slate-800"
          onClick={() => setOpened(true)}
        >
          Add an Event!
        </Button>
      </Group>
    </div>
  );
}

export default AddEvent;

// eventName: string,
//     address_1: string,
//     address_2: string,
//     city: string,
//     date: Date,
//     description: string,
//     prospective: boolean,
//     state: string,
//     zipcode: string,
//     img_url: string,
