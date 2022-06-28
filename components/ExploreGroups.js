import { Button, Group, Modal, TextInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ExploreGroups = () => {
  const [opened, setOpened] = useState(false);
  const [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    if (opened) {
      axios
        .get("/api/groups")
        .then((res) => {
          setAllGroups(res.data.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Find new groups!</Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Find New Groups!"
      >
        {allGroups.map((group, index) => (
          <Link href={`/group?id=${group.group_id}`} passHref>
            <Group key={index}>
              {" "}
              {group.name} {group.description}{" "}
            </Group>
          </Link>
        ))}
      </Modal>
    </div>
  );
};

export default ExploreGroups;
