import React from "react";
// import "./Account.css";
import "./EditUser.css";
import { Form, Field } from "react-final-form";
import DataItem from "./DataItem";
import loopit from "../../../api/loopit";
import { connect } from "react-redux";
import { updateUser } from "../../../actions";

const ModalEdit = ({ userInfo, isEditable, setIsEditable }) => {
  const onSubmit = async ({ username, email, fullname }) => {
    console.log(username, email, fullname);

    if (
      username === userInfo.username &&
      email === userInfo.email &&
      fullname === userInfo.full_name
    )
      alert("no cambiaste nada :)");
    else {
      try {
        const res = await loopit.put("/users/update", {
          username: username,
          email: email,
          full_name: fullname,
        });

        console.log(res);
      } catch (error) {
        console.log(`${error}`);
      }
      setIsEditable(false);
    }
  };

  const { username, email, full_name } = userInfo;
  const buildInput = ({ meta, input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  };

  return (
    <>
      {!isEditable ? (
        <>
          <DataItem
            name="Username:"
            stat={username}
            className="profile-data-item"
          />
          <DataItem name="Email:" stat={email} className="profile-data-item" />
          <DataItem
            name="Full name:"
            stat={full_name}
            className="profile-data-item"
          />
        </>
      ) : (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h3>Username:</h3>
              <Field
                name="username"
                component={buildInput}
                initialValue={username}
              />
              <h3>Email:</h3>
              <Field name="email" component={buildInput} initialValue={email} />
              <h3>Full Name:</h3>
              <Field
                name="fullname"
                component={buildInput}
                initialValue={full_name}
              />

              <div className="button-container">
                <button className="profile-btn-edit">Confirm</button>
              </div>
            </form>
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth,
  };
};

export default connect(mapStateToProps, { updateUser })(ModalEdit);
