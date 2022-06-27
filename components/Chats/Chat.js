import {
  Button,
  Dialog,
  Group,
  TextInput,
  Text,
  Avatar,
  Stack,
  Box,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import fakeMessages from '../../utils/messages/fakemessages'
import messagesList from './Messages'
function Chat() {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const [messages, setMessages] = useState(null)
  useEffect(() => {
    axios
      .get("/api/messages/1/2")
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formSubmit = (msgString) => {
    axios.post(`/api/messages/1/2`, {message: msgString}).then(() => {
      axios.get(`/api/messages/1/2`) .then((res) => {
        setMessages(res.data)
      })
    })
  }

  const mappedMessages = messagesList(messages)

  return (
    <>
      <Button
        onClick={() => setOpened((o) => !o)}
        className="bg-slate-800 text-black"
      >
        Open Chat
      </Button>
      <Dialog
        position={{ bottom: 0, right: 100 }}
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        radius="md"
        className="p-0 w-[200px] sm:w-[400px] "
      >
        <Stack
          justify="flex-start"
          className="h-[50vh] border-0 rounded-none gap-0"
        >
          <Group className="border-b-2 rounded-none w-full bg-offwhite h-[10%]">
            <Avatar radius="xl" component="span" size={35} className="ml-1" />
            <span>Bark User</span>
          </Group>
          {mappedMessages}
          <Box>
            <form
              onSubmit={form.onSubmit((values) => formSubmit(values.message))}
            >
              <Group className="w-[100%] gap-0 bg-offwhite">
                <Textarea
                  className="w-[100%] rounded-none"
                  styles={{
                    input: { backgroundColor: 'white', borderWidth: '1px 0 0 0', borderRadius: '0px' },
                  }}
                  required
                  placeholder='Write a message...'
                  minRows={2}
                  maxRows={4}
                  autosize
                  onChange={(event) =>
                    form.setFieldValue("message", event.currentTarget.value)
                  }
                  {...form.getInputProps("message")}
                />
                <Button
                  className="bg-slate-800 ml-[70%] mt-1 mb-1 text-white"
                  type="submit"
                  radius="xl"
                  size="xs"
                >
                  Send
                </Button>
              </Group>
            </form>
          </Box>
        </Stack>
      </Dialog>
    </>
  );
}

export default Chat;
