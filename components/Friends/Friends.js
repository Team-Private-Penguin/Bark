import Chat from "./Chat.js";
import FriendList from "./FriendList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@mantine/core";

function Friends({groupId, listType}) {
  console.log(groupId, listType)
  const [opened, setOpened] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [clicked, setClicked] = useState({});

  const handleChat = (friend) => {
    setOpened(true)
  }

  useEffect(() => {
    if (listType === 'friends') {
      axios
        .get("/api/friends/1")
        .then((res) => {
          setFriendList(res.data);
        })
        .catch((err) => console.log(err));
    } else if (listType === 'groups') {
      axios
      .get(`/api/members/${groupId}`)
      .then((res) => {
        setFriendList(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [listType, groupId]);

  return (
    <>
      {friendList.length > 0 ? (
        <FriendList friendList={friendList} handleChat={handleChat} setClicked={setClicked} />
      ) : (
        <span>Add some friends</span>
      )}
      <Chat opened={opened} setOpened={setOpened} clicked={clicked}/>
    </>
  );
}

export default Friends;
