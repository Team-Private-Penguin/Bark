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
      console.log("groups list", data.data[0].rows);
      setUserGroups(data.data[0].rows);
    });
  }, []);

  return (
    <Stack className="h-[35vh] overflow-auto">
      {UserGroups.map(({ group_id, name, description }, index) => {
        return (
          <Link key={index} href={`/group?id=${group_id}`} passHref>
            <Stack className="border cursor-pointer">
              <div>{name}</div>
              <div>{description.slice(0, 100)}</div>
            </Stack>
          </Link>
        );
      })}
    </Stack>
  );
}

export default GroupList;
