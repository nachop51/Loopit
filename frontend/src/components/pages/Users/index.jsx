import "./Users.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();

  useEffect(() => {
    console.log(username);
  }, [username]);

  return <h1>User</h1>;
};

export default User;
