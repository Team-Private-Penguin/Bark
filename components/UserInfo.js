import { useUser } from "@auth0/nextjs-auth0";
import React from "react";

function UserInfo() {
  const { user, error, isLoading } = useUser();
  console.log(useUser);
  return <div>UserInfo</div>;
}

export default UserInfo;
