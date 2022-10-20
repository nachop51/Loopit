import "./Users.css";
import loopit from "../../../api/loopit";
import ProfileItem from "../Account/ProfileItem";

import { useEffect, useState } from "react";
import LoopList from "../../LoopList";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await loopit.get(`/users/profile/${username}`);
      setUser(response.data.user);
      setFollowing(response.data.user.follow);
    };
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    try {
      if (following) {
        await loopit.post(`/followers/delete/${user.personal_info?.id}`);
      } else {
        await loopit.post(`/followers/add/${user.personal_info?.id}`);
      }
      setFollowing(!following);
    } catch {
      console.log("Error");
    }
  };

  return (
    user && (
      <main className="account">
        <div className="profile">
          <ProfileItem
            followers={user.followers}
            following={user.following}
            loops={user.loops}
            saves={user.saves}
          >
            <h3>@{user.personal_info?.username}</h3>
            <h3>{user.personal_info?.full_name}</h3>
            <button
              onClick={handleFollow}
              className="btn btn-animation btn-primary follow-user"
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          </ProfileItem>
        </div>
        <LoopList collection="search" user={user.personal_info?.username} />
      </main>
    )
  );
};

export default User;
