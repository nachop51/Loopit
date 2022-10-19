import "./Account.css";
import LoadingSpinner from "../../../assets/nobg.gif";
import LoopList from "../../LoopList/";
import { fetchUser, signOut } from "../../../actions";
import ProfileItem from "./ProfileItem";
import DataItem from "./DataItem";
import EditUser from "./EditUser";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Account = ({ auth, account, fetchUser, signOut }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    full_name: "",
  });

  useEffect(() => {
    if (!account) fetchUser();
    else
      setData({
        username: auth.username,
        email: account.data?.email,
        full_name: account.data?.full_name,
      });
  }, [fetchUser, account, auth.username]);

  if (account === null) {
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
        <ProfileItem
          followers={account.followers}
          following={account.following}
          loops={account.loops}
          saves={account.saves}
        />
        <div className="profile-ui profile-data">
          <h2>Personal information:</h2>
          <div className="profile-data-container">
            {isEditable === false ? (
              <>
                <DataItem
                  name="Username:"
                  stat={auth.username}
                  className="profile-data-item"
                />
                <DataItem
                  name="Email:"
                  stat={account.data?.email}
                  className="profile-data-item"
                />
                <DataItem
                  name="Full name:"
                  stat={account.data?.full_name}
                  className="profile-data-item"
                />
              </>
            ) : (
              <>
                <EditUser
                  userInfo={data}
                  setIsEditable={setIsEditable}
                  isEditable={isEditable}
                />
              </>
            )}
          </div>
          <div className="button-container">
            {!isEditable && (
              <button
                className="profile-btn-edit"
                onClick={() => setIsEditable(true)}
              >
                Edit
              </button>
            )}

            <button onClick={() => signOut()} className="profile-btn-sign-out">
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <LoopList collection="created" />
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    account: state.account,
  };
};

export default connect(mapStateToProps, { fetchUser, signOut })(Account);
