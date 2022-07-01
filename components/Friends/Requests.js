import React, { useEffect, useState } from "react";
import axios from "axios";
import { Group, Avatar, Stack, ScrollArea, Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Check, LetterX } from "tabler-icons-react";

function Requests({ requests, setUpdateList, userId, setUpdateFriends }) {
  const handleDecline = (id) => {
    axios.delete(`/api/friend/${id}/${userId}`).then((res) => {
      setUpdateList((o) => !o);
    });
  };

  const handleAccept = (id) => {
    axios.post(`/api/friend/send`, { user: userId, friend: id }).then((res) => {
      setUpdateList((o) => !o);
      setUpdateFriends((o) => !o);
    });
  };

  const mappedFriends = requests.map((friend, index) => {
    return (
      <Group key={index} className="border-b-2 pb-1 pt-50 mb-3">
        <Group noWrap className=" gap-2 w-[50%]">
          <Avatar
            src={friend.photo}
            radius="xl"
            component="span"
            size={30}
            className="ml-5"
          />
          <span className="ml-2">{friend.name}</span>
        </Group>
        <Group position="right" className="w-[40%] gap-5">
          <Check
            onClick={() => handleAccept(friend.user_id)}
            className="cursor-pointer"
            size={18}
            strokeWidth={2}
            color={"#40bf6c"}
          />
          <LetterX
            onClick={() => handleDecline(friend.user_id)}
            className="cursor-pointer"
            size={14}
            strokeWidth={2}
            color={"red"}
          />
        </Group>
      </Group>
    );
  });
  return (
    <ScrollArea offsetScrollbars scrollbarSize={8}>
      {mappedFriends}
    </ScrollArea>
  );
}

export default Requests;
