import {
  Button,
  Card,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
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
        <Button onClick={() => setOpened(true)} className="bg-teal">
          Find new groups!
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Find New Groups!"
        className="font-bold"
        size="lg"
      >
        {allGroups.map((group, index) => (
          <Link key={index} href={`/group?id=${group.group_id}`} passHref>
            <Card
              radius="md"
              p="md"
              className="w-full cursor-pointer bg-white text-black mt-2 drop-shadow-lg hover:drop-shadow-md hover:text-teal"
              onClick={() => setOpened(false)}
            >
              <Group>
                <FontAwesomeIcon className="paw-groups" icon={faPaw} />
                <div>
                  <Title order={3}> {group.name}</Title>
                  <Text className="text-xs font-normal">
                    {group.description}
                  </Text>
                </div>
              </Group>
            </Card>
          </Link>
        ))}
      </Modal>
    </div>
  );
};

export default ExploreGroups;
