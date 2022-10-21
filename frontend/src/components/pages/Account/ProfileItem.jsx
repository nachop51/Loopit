import DataItem from "./DataItem";

const ProfileItem = ({ followers, following, saves, loops, children }) => {
  return (
    <div className="profile-ui profile-stats">
      <img
        className="profile-stats-pic"
        src="https://avatars.githubusercontent.com/u/79727818?v=4"
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
