import { useUser } from "@auth0/nextjs-auth0";
import { Stack } from "@mantine/core";
import React from "react";
import { Button } from "@mantine/core";

function UserInfo() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <Stack align="center">
        <div className="user-header">
          <img src={user.picture} alt={user.name} className="profile-picture" />
          <span className="username">{user.name}</span>
        </div>
        <a href="/api/auth/logout">
          <Button className="teal-btn">Logout</Button>
        </a>
      </Stack>
    );
  }

  return (
    <div className="user-header">
      <a href="/api/auth/login">
        <Button className="teal-btn">Login</Button>
      </a>
    </div>
  );
}

export default UserInfo;
