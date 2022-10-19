import "./Users.css";
import loopit from "../../../api/loopit";
import ProfileItem from "../Account/ProfileItem";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await loopit.get(`/users/profile/${username}`);
      console.log(response.data);
      setUser(response.data.user);
    };
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    const response = await loopit.post(
      `/followers/add/${user.personal_info?.id}`
    );
    console.log(response.data);
  };

  return (
    user && (
      <div className="profile">
        <ProfileItem
          followers={user.followers}
          following={user.following}
          loops={user.loops}
          saves={user.saves}
        >
          <h3>{user.personal_info?.username}</h3>
          <h3>{user.personal_info?.full_name}</h3>
          <button onClick={handleFollow}>Follow</button>
        </ProfileItem>
      </div>
    )
  );
};

export default User;
