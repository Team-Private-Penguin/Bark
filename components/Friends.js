import { Button, Dialog, Group, TextInput, Text, Avatar, Stack } from "@mantine/core";
import { useState } from "react";

function Friends() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpened((o) => !o)}
        className="bg-slate-800 text-black"
      >
        Open Chat
      </Button>
      <Dialog
        position={{ bottom: 20, right: 50 }}
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size={400}
        radius="md"
        className="p-0"
      >
        <Stack  className="h-[50vh] border-0 rounded-none">
          <Group className="border-b-2 rounded-none w-full bg-offwhite h-[10%]">
            <Avatar radius="xl" component="span" size={35} className="ml-1"/>
            <span>friends name</span>
          </Group>
          <div className="border-0 rounded-none">asf</div>
        </Stack>
      </Dialog>
    </>
  );
}

export default Friends;
