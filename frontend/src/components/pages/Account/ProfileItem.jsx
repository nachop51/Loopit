import DataItem from "./DataItem";

const ProfileItem = ({
  followers,
  following,
  saves,
  loops,
  children,
  username,
}) => {
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
        <DataItem
          name="Followers"
          stat={followers}
          className="stats-container"
        />
        <DataItem
          name="Following"
          stat={following}
          className="stats-container"
        />
        <DataItem name="Loops saved" stat={saves} className="stats-container" />
        <DataItem
          name="Loops created"
          stat={loops}
          className="stats-container"
        />
      </div>
    </div>
  );
};

export default ProfileItem;
