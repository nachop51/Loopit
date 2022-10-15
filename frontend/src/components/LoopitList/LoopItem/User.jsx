import PropTypes from "prop-types";

const User = ({ username, time }) => {
  const calulateTime = () => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} years ago`;
    if (months > 0) return `${months} months ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return "Just now";
  };

  return (
    <div className="user-info">
      <div className="avatar">
        <img
          src="https://i.pravatar.cc/300"
          className="avatar-img"
          alt="user-profile"
        />
      </div>
      <div>
        <h3>{username}</h3>
        <span>{calulateTime()}</span>
      </div>
    </div>
  );
};

User.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default User;
