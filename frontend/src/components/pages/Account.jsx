import "./Account.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../actions";

const Account = ({ user, fetchUser }) => {
  useEffect(() => {
    if (!user) fetchUser();
  }, [fetchUser, user]);

  return (
    <main className="account">
      <h1 className="account-title">My account</h1>
      <div className="profile">
        <div className="profile-ui profile-stats">
          <img
            className="profile-stats-pic"
            src="https://avatars.githubusercontent.com/u/79727818?v=4"
            alt="Profile"
          />
          <h2 className="profile-stats-heading">Stats:</h2>
          <div className="profile-stats-container">
            <div className="stats-container">
              <h3>Following</h3>
              <h4>10</h4>
            </div>
            <div className="stats-container">
              <h3>Followers</h3>
              <h4>8</h4>
            </div>
            <div className="stats-container">
              <h3>Gists saved</h3>
              <h4>19</h4>
            </div>
            <div className="stats-container">
              <h3>Gists uploaded</h3>
              <h4>3</h4>
            </div>
          </div>
        </div>
        <div className="profile-ui profile-data">
          <h2>Personal information:</h2>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(Account);
