import DataItem from "./DataItem";
import ModalUsers from "./ModalUsers";

import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  followers,
  following,
  saves,
  loops,
  children,
  username,
  id,
}) => {
  const [modalFollowers, setFollowers] = useState(false);
  const [modalFollowing, setFollowing] = useState(false);

  return (
    <div className="profile-ui profile-stats">
      <img
        className="profile-stats-pic"
        src={`https://avatars.dicebear.com/api/personas/${username}.svg`}
        alt="Profile"
      />
      {children ? children : null}
      <h2 className="profile-stats-heading">Stats:</h2>
      <div className="profile-stats-container">
        <div className={"stats-container"} onClick={() => setFollowers(true)}>
          <h3>Followers</h3>
          <h4>{followers}</h4>
        </div>
        <div className={"stats-container"} onClick={() => setFollowing(true)}>
          <h3>Following</h3>
          <h4>{following}</h4>
        </div>
        <Link to="/l/saved">
          <DataItem
            name="Loops saved"
            stat={saves}
            className="stats-container"
          />
        </Link>
        <a href="#loops-title">
          <DataItem
            name="Loops created"
            stat={loops}
            className="stats-container"
          />
        </a>
      </div>
      <ModalUsers
        isOpen={modalFollowers}
        closeModal={() => setFollowers(false)}
        mode={"followers"}
        id={id}
      />
      <ModalUsers
        isOpen={modalFollowing}
        closeModal={() => setFollowing(false)}
        mode={"following"}
        id={id}
      />
    </div>
  );
};

export default ProfileItem;
