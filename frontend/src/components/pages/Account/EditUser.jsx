// import "./Account.css";
import "./EditUser.css";
import DataItem from "./DataItem";
import loopit from "../../../api/loopit";
import { updateUser } from "../../../actions";

import { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";

const EditUser = ({ user, auth, isEditable, setIsEditable, updateUser }) => {
  const [theme, setTheme] = useState(auth.theme);
  const [editorTheme, setEditorTheme] = useState(auth.editorTheme);

  const onSubmit = async ({ username, email, fullname }) => {
    if (
      username === auth.username &&
      email === user.email &&
      fullname === user.full_name &&
      theme === auth.theme &&
      editorTheme === auth.editorTheme
    )
      setIsEditable(false);
    else {
      try {
        const params = {};
        if (username !== auth.username) params.username = username;
        if (email !== user.email) params.email = email;
        if (fullname !== user.full_name) params.full_name = fullname;
        if (theme !== auth.theme) params.theme = theme;
        if (editorTheme !== auth.editorTheme) params.editorTheme = editorTheme;

        // ^ After checking if the user has changed any of the fields, we send the request to the backend.
        console.log(params);
        await loopit.put("/users/update", params);
        updateUser(username, email, fullname, theme, editorTheme);
      } catch (error) {
        console.log(error);
      }
      setIsEditable(false);
    }
  };

  const { email, full_name } = user;
  const username = auth.username;

  const buildInput = ({ meta, input, label }) => {
    return (
      <div className="edit-user-div">
        <label>{label}:</label>
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
            <form onSubmit={handleSubmit} className="edit-user">
              <Field
                name="username"
                component={buildInput}
                initialValue={username}
                label="Username"
              />
              <Field
                name="email"
                component={buildInput}
                initialValue={email}
                label="Email"
              />
              <Field
                name="fullname"
                component={buildInput}
                initialValue={full_name}
                label="Full Name"
              />
              <h4 className="edit-user-preferences">Preferences</h4>
              <div className="edit-user-div">
                <label htmlFor="theme">Page theme:</label>
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                    return e.target.innerHTML;
                  }}
                >
                  {theme === "dark" ? (
                    <>
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </>
                  ) : (
                    <>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </>
                  )}
                </select>
              </div>
              <div className="edit-user-div">
                <label htmlFor="editorTheme">Editor theme:</label>
                <select
                  id="editorTheme"
                  name="editorTheme"
                  value={editorTheme}
                  onChange={(e) => {
                    setEditorTheme(e.target.value);
                    return e.target.innerHTML;
                  }}
                >
                  {editorTheme === "vs-dark" ? (
                    <>
                      <option value="vs-dark">Dark theme</option>
                      <option value="light">Light theme</option>
                    </>
                  ) : (
                    <>
                      <option value="light">Light theme</option>
                      <option value="vs-dark">Dark theme</option>
                    </>
                  )}
                </select>
              </div>
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
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateUser })(EditUser);
