import { useState, useEffect } from "react";

import LoadingSpinner from "../../../assets/nobg.gif";
import User from "../../LoopList/LoopItem/User";
import loopit from "../../../api/loopit";

const ModalUsers = ({ isOpen, closeModal, mode, id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await loopit.get(`/users/${mode}/${id}`);
        if (mode === "followers") setUsers(res.data.followers);
        else setUsers(res.data.followings);
      } catch (error) {
        setUsers([]);
      }
    };
    fetch();
  }, [setUsers, id, mode]);

  return (
    <div onClick={closeModal} className={`modal ${isOpen ? "show" : ""}`}>
      <div onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-users-title">{mode}</h3>
        <hr />
        <div className="users-container">
          {users !== []
            ? users.map((user) => (
                <User
                  key={`${mode} - ${user.id}`}
                  username={user.username}
                  time={null}
                >
                  <button
                    className="btn button-follow"
                    onClick={() => console.log("Follow")}
                  >
                    Follow
                  </button>
                </User>
              ))
            : "Looks like no one is here yet"}
        </div>
      </div>
    </div>
  );
};

export default ModalUsers;
