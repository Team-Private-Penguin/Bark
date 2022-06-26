import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@mantine/core";
import React from "react";

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
      <>
        <div className="user-header">
          <img src={user.picture} alt={user.name} className="profile-picture" />
          <span className="username">{user.name}</span>
        </div>
        <a href="/api/auth/logout">
          <Button color="cyan" variant="outline">
            Logout
          </Button>
        </a>
      </>
    );
  }

  return (
    <div className="user-header">
      <a href="/api/auth/login">
        <Button color="cyan" variant="outline">
          Login
        </Button>
      </a>
    </div>
  );
}

export default UserInfo;
