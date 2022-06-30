import { Button, Card, Group, Modal, TextInput, Title } from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        className="font-bold"
      >
        {allGroups.map((group, index) => (
          <Link key={index} href={`/group?id=${group.group_id}`} passHref>
            <Card
              p="md"
              className="cursor-pointer text-black mt-2 drop-shadow-md hover:drop-shadow-sm hover:text-main"
              onClick={() => setOpened(false)}
            >
              <Group>
                <FontAwesomeIcon icon={faPaw} />
                <Title order={5}> {group.name}</Title>
              </Group>
            </Card>
          </Link>
        ))}
      </Modal>
    </div>
  );
};

export default ExploreGroups;
