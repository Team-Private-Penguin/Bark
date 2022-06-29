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
          setAllGroups(res.data[0].rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [opened]);

  return (
    <div>
      <Group position="center">
        <Button onClick={() => setOpened(true)} className="bg-slate-800">
          Find new groups!
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Find New Groups!"
      >
        {allGroups.map((group, index) => (
          <Link key={index} href={`/group?id=${group.group_id}`} passHref>
            <Group>
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
