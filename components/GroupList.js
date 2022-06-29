import React, { useState, useEffect } from "react";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

function GroupList() {
  const { user } = useUser();
  const user_id = user?.sub.split("google-oauth2|")[1];
  const [UserGroups, setUserGroups] = useState([]);
  useEffect(() => {
    axios.get(`/api/usergroup?user_id=${user_id}`).then((data) => {
      setUserGroups(data.data[0].rows);
    });
  }, []);

  return (
    <Stack>
      {UserGroups.map(({ group_id, name }) => {
        return (
          <Link key={group_id} href={`/group?id=${group_id}`} passHref>
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
