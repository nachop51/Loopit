import "./User.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ username, time, children }) => {
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
      <Link to={"/l/users/" + username} className="user-info_link-profile">
        <div className="avatar">
          <img
            src={`https://avatars.dicebear.com/api/personas/${username}.svg`}
            className="avatar-img"
            alt="user-profile"
          />
        </div>
        <div>
          <h3 className="user-info_username">{username}</h3>
          <span className="user-info_time">{time ? calulateTime() : null}</span>
        </div>
      </Link>
      {children ? children : null}
    </div>
  );
};

User.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string,
};

export default User;
