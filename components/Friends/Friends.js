import Chat from "./Chat.js";
import FriendList from "./FriendList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@mantine/core";

function Friends() {
  const [opened, setOpened] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [clicked, setClicked] = useState({});

  const handleChat = (friend) => {
    setOpened(true)
  }

  useEffect(() => {
    axios
      .get("/api/friends/1")
      .then((res) => {
        setFriendList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
