import axios from "axios";
import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import UserInfo from "./UserInfo";
import { useUser } from "@auth0/nextjs-auth0";
import Dropzone from "./Dropzone.tsx";

function AddUser() {
  const [opened, setOpened] = useState(false);
  const { user } = useUser();
  const [image, setImage] = useState("");
  const form = useForm({
    initialValues: {
      user_id: "",
      name: "",
      size: "",
      energy: "",
      f_people: "",
      f_dogs: "",
      photo: "",
      zipcode: "",
    },
  });
  const submitUser = (values) => {
    let userId = user.sub.split("google-oauth2|")[1];
    if (!userId) {
      userId = user.sub.split("auth0|")[1];
    }
    const submission = {
      user_id: userId,
      name: values.name,
      size: values.size,
      energy: values.energy,
      f_people: values.f_people,
      f_dogs: values.f_dogs,
      photo: image,
      zipcode: values.zipcode,
    };
    axios
      .post("/api/users/users", submission)
      .then(() => {
        setOpened(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New User!"
        transition="skew-up"
        timingFunction="ease"
      >
        <UserInfo />
        <form onSubmit={form.onSubmit((values) => submitUser(values))}>
          <TextInput
            required
            label="Name"
            placeholder="What is your pet's name?"
            {...form.getInputProps("name")}
          />
          <Select
            label="Size"
            placeholder="What is your dog's size?"
            required
            data={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            {...form.getInputProps("size")}
          />
          <Select
            label="Energy"
            placeholder="What is your dog's energy level?"
            required
            data={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            {...form.getInputProps("energy")}
          />
          <Select
            label="Friendliness to People"
            placeholder="Is your dog friendly to people?"
            required
            data={[
              { value: "friendly", label: "Friendly" },
              { value: "aggressive", label: "Aggressive" },
            ]}
            {...form.getInputProps("f_people")}
          />
          <Select
            label="Friendliness to Dogs"
            placeholder="Is your dog friendly to dogs?"
            required
            data={[
              { value: "friendly", label: "Friendly" },
              { value: "aggressive", label: "Aggressive" },
            ]}
            {...form.getInputProps("f_dogs")}
          />
          <TextInput
            required
            label="ZIP code"
            placeholder="What is your ZIP code?"
            {...form.getInputProps("zipcode")}
          />
          <br />
          <Dropzone setImage={setImage} />

          <Group position="center" mt="md">
            <Button
              className="teal-btn"
              type="submit"
              onClick={() => setOpened(false)}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button className="teal-btn my-20 " onClick={() => setOpened(true)}>
          ADD YOUR PET
        </Button>
      </Group>
    </div>
  );
}

export default AddUser;
