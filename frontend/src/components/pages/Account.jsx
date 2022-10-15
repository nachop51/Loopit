import "./Account.css";
import LoadingSpinner from "../../assets/nobg.gif";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../actions";

const Account = ({ auth, user, fetchUser }) => {
  useEffect(() => {
    if (!user) fetchUser();
  }, [fetchUser, user]);

  if (user === null) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </div>
    );
  }

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
              <h4>{user?.saves}</h4>
            </div>
            <div className="stats-container">
              <h3>Gists uploaded</h3>
              <h4>{user?.loops}</h4>
            </div>
          </div>
        </div>
        <div className="profile-ui profile-data">
          <h2>Personal information:</h2>
          <div className="profile-data-container">
            <div className="profile-data-item">
              <h3>Username:</h3>
              <h4>{auth.username}</h4>
            </div>
            <div className="profile-data-item">
              <h3>Email:</h3>
              <h4>{user.data?.email}</h4>
            </div>
            <div className="profile-data-item">
              <h3>Full name:</h3>
              <h4>{user.data?.full_name}</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(Account);
