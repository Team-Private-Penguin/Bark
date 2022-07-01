import React, { useEffect, useState } from "react";
import axios from "axios";
import { Group, Avatar, Stack, ScrollArea } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Crown } from "tabler-icons-react";

function FriendList({ friendList, setClicked, handleChat, setModal, userId }) {
  const mappedFriends = friendList.map((friend, index) => {
    return (
      <Group key={index} className="border-b-2 pb-1 pt-50 mb-3">
        <Group className=" w-[50%]">
          <Avatar
            src={friend.photo}
            radius="xl"
            component="span"
            size={30}
            className="ml-5"
          />
          <span className="ml-2">{friend.name}</span>
          {friend.user_id === friend.admin_id && (
            <Crown size={24} strokeWidth={2} color={"#bfb140"} />
          )}
        </Group>
        <Group position="right" className="w-[40%] ">
          {friend.user_id !== userId && (
            <Avatar
              onClick={() => {
                handleChat(friend);
                setClicked(friend);
              }}
              radius="xl"
              size={25}
              className="cursor-pointer shadow red-hover"
            >
              <FontAwesomeIcon icon={faMessage} className="w-[55%] " />
            </Avatar>
          )}
          <Avatar
            radius="xl"
            size={25}
            className="cursor-pointer shadow red-hover"
            onClick={() => {
              setClicked(friend);
              setModal(true);
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} className="w-[55%] " />
          </Avatar>
        </Group>
      </Group>
    );
  });
  return (
    <ScrollArea offsetScrollbars scrollbarSize={8} className="mt-2">
      {mappedFriends}
    </ScrollArea>
  );
}

export default FriendList;
