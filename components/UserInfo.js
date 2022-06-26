import { useUser } from "@auth0/nextjs-auth0";
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
          <button className="bg-transparent hover:bg-accent text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
            Logout
          </button>
        </a>
      </>
    );
  }

  return (
    <div className="user-header">
      <a href="/api/auth/login">
        <button className="bg-transparent hover:bg-accent text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Login
        </button>
      </a>
    </div>
  );
}

export default UserInfo;
