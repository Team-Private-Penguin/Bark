import axios from "axios";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useUser } from "@auth0/nextjs-auth0";

const AddGroup = () => {
  const { user } = useUser();
  const user_id = user?.sub.split("google-oauth2|")[1];

  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      admin_id: user_id,
    },
  });

  const handleSubmit = (values) => {
    values["admin_id"] = user_id;
    axios.post("/api/groups", values).then((data) => {
      let submission = {
        user_id: user_id,
        group_id: data.data[0].rows[0]["group_id"],
      };
      axios.post("/api/usergroup", submission);
    });
    setOpened(false);
  };

  return (
    <div>
      <Group position="center">
        <Button className="bg-slate-800" onClick={() => setOpened(true)}>
          Create a New Group!
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Group!"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            placeholder="Name"
            label="Name"
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            placeholder="Description"
            label="Description"
            required
            {...form.getInputProps("description")}
          />

          <Group position="right" mt="md">
            <Button className="bg-slate-800" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default AddGroup;
