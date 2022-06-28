import React, { useState } from "react";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";

function GroupList() {
  const [UserGroups, setUserGroups] = useState([
    { group_id: 1, name: "Something", description: "something description" },
    { group_id: 2, name: "Something", description: "something description" },
    { group_id: 3, name: "Something", description: "something description" },
  ]);
  return (
    <Stack>
      {UserGroups.map(({ group_id, name }) => {
        return (
          <Link href={`/group?id=${group_id}`} passHref>
            <Group>
              {name}
              {group_id}
            </Group>
          </Link>
        );
      })}
    </Stack>
  );
}

export default GroupList;
