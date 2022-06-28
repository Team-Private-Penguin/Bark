import Chat from "./Chat.js";
import FriendList from "./FriendList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@mantine/core";

function Friends() {
  const [opened, setOpened] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [clicked, setClicked] = useState({});

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
      {friendList.length > 0 ? <FriendList friendList={friendList} setClicked={setClicked}/> : <span>Add some friends</span>}
      <Chat opened={opened} setOpened={setOpened} />
    </>
  );
}

export default Friends;
