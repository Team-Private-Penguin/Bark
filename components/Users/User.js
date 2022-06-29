import axios from "axios";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

function User() {
  const { user } = useUser();

  if (user) {
    const userId = user.sub.split("google-oauth2|")[1];
    console.log(user.sub.split("google-oauth2|")[1]);
    console.log(userId);
    function getUserData() {
      axios
        .get(`api/users/users?user_id=${userId}`)
        .then((result) => console.log(result.data[0], "result"))
        .catch((err) => console.error(err));
    }
    useEffect(() => {
      getUserData();
    }, []);
  }

  return <div>Hello world</div>;
}

export default User;
