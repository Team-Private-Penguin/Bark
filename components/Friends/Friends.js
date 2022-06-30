import Chat from "./Chat.js";
import FriendList from "./FriendList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea, Modal } from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0";
import UserModal from './UserModal'
function Friends({groupId, listType, updateFriends}) {
  const [opened, setOpened] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [clicked, setClicked] = useState({});
  const [modal, setModal] = useState(false);
  const { user } = useUser();

  const handleChat = (friend) => {
    setOpened(true)
  }
  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }

  useEffect(() => {
    if (listType === 'friends') {
      axios
        .get(`/api/friends/${userId}`)
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
  }, [listType, groupId, userId, updateFriends]);

  return (
    <>
      {friendList.length > 0 && userId ? (
        <FriendList userId={userId} friendList={friendList} handleChat={handleChat} setClicked={setClicked} setModal={setModal}/>
      ) : (
        <span>Join groups to find friends!</span>
      )}
      <Chat opened={opened} setOpened={setOpened} clicked={clicked} userId={userId}/>
      <Modal opened={modal}
        onClose={() => setModal(false)}
        size='xl'
        >
          <UserModal userId={userId} clicked={clicked}/>
      </Modal>
    </>
  );
}

export default Friends;
