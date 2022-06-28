import { fromJson } from "@auth0/nextjs-auth0/dist/session";
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

function Chat({opened, setOpened, clicked}) {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  const [messages, setMessages] = useState(null)
  useEffect(() => {
    if (clicked.user_id) {
      axios
        .get(`/api/messages/1/${clicked.user_id}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    }
  }, [clicked]);

  const formSubmit = (msgString) => {
    axios.post(`/api/messages/1/${clicked.user_id}`, {message: msgString}).then(() => {
      axios.get(`/api/messages/1/${clicked.user_id}`) .then((res) => {
        setMessages(res.data)
      })
    })
  }
  const mappedMessages = messagesList(messages)

  return (
    <>
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
            <Avatar src={clicked.photo} radius="xl" component="span" size={35} className="ml-1" />
            <span>{clicked.name}</span>
          </Group>
          {mappedMessages}
          <Box>
            <form
              onSubmit={form.onSubmit((values) => {
                formSubmit(values.message)
                form.reset()
              })}
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
                  className="bg-slate-800 ml-[77%] mt-1 mb-1 text-white"
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
