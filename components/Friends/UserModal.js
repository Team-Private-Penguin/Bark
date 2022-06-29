import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack } from "@mantine/core";

function UserModal({ clicked, userId }) {
  const [currStatus, setCurrStatus] = useState("notFriends");
  const [list, setList] = useState({});

  useEffect(() => {
    const promises = [
      axios.get(`/api/friend/${userId}/${clicked.user_id}`),
      axios.get(`/api/friend/${clicked.user_id}/${userId}`),
    ];
    Promise.all(promises).then((res) => {
      setList({ user: res[0].data.length, friend: res[1].data.length });
    });

  }, [clicked, currStatus]);

  useEffect(() => {
    if (list.user === 0 && list.friend === 0) {
      setCurrStatus("notFriends");
    } else if (list.user === 1 && list.friend === 1) {
      setCurrStatus("friends");
    } else if (list.user === 1 && list.friend === 0) {
      setCurrStatus("sent");
    } else {
      setCurrStatus("accept");
    }
    if (clicked.user_id === userId) {
      setCurrStatus('self')
    }
  }, [list, currStatus]);

  const handleClick = () => {
    axios
      .post("/api/friend/1", { user: userId, friend: clicked.user_id })
      .then(() => setCurrStatus("request"));
  };
  return (
    <>
      <Stack>
        {currStatus === "notFriends" && (
          <Button className="bg-slate-800 text-white" onClick={handleClick}>
            Add friend
          </Button>
        )}
        {currStatus === "friends" && <span>Friends</span>}
        {currStatus === "sent" && <span>Request Sent</span>}
        {currStatus === "self" && <span></span>}
        {currStatus === "accept" && (
          <Button className="bg-slate-800 text-white" onClick={handleClick}>
            Accept Friend Request
          </Button>
        )}
      </Stack>
    </>
  );
}

export default UserModal;
