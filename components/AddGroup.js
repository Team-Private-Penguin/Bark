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

const AddGroup = () => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      admin_id: 1,
    },
  });

  const handleSubmit = (values) => {
    axios.post("/api/groups", values);
  };

  return (
    <div>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add a Group!</Button>
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
            <Button color="dark" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default AddGroup;
