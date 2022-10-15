import "./CreateLoop.css";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import loopit from "../../api/loopit";
import LoadEditor from "../Editor";

const CreateLoop = ({ user_id }) => {
  const [language, setLanguage] = useState("text");
  const [code, setCode] = useState("");

  const onSubmit = async ({ name, description, language, filename }) => {
    if (code.length > 3000) return null;

    if (!language) {
      return { [FORM_ERROR]: "Language is required" };
    }
    if (!code || code === "") {
      return null;
    }

    console.log(language.toLowerCase());
    const params = {
      name,
      content: code,
      language: language.toLowerCase(),
      user_id,
    };
    if (description) params.description = description;
    if (filename) params.filename = filename;
    console.log(params);
    try {
      const response = await loopit.post("/loops/add", params);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const buildInput = ({ input, placeholder, optionalClass }) => {
    return (
      <input
        {...input}
        className={optionalClass ? optionalClass : ""}
        placeholder={placeholder}
        id={input.name}
        autoComplete="off"
      />
    );
  };

  return (
    <main className="editor">
      <h2 className="heading-creator">Create your loop!</h2>
      <div className="editor-container">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit} className="editor-form">
              <div className="inputs-required">
                <Field
                  name="name"
                  optionalClass="editor-req"
                  validate={(input) => {
                    return input === "" ? { title: "Title is required" } : null;
                  }}
                  placeholder="Title"
                  render={buildInput}
                />
                <Field
                  className="editor-req"
                  name="language"
                  component="select"
                >
                  <option value="text">Choose a language</option>
                  <option value="Javascript">❤️ JavaScript</option>
                  <option value="Python">💚 Python</option>
                  <option value="HTML">💙 HTML</option>
                </Field>
              </div>
              <LoadEditor setCode={setCode} language={language} />
              <div className="input-optional">
                <Field
                  name="filename"
                  placeholder="Filename (optional)"
                  render={buildInput}
                />
                <Field
                  name="description"
                  placeholder="Description (optional)"
                  render={buildInput}
                />
                <button type="submit" className="btn btn-lily create-loop">
                  Create loop
                </button>
              </div>
              {submitError ? (
                <div className="error-message show-editor-error">
                  {submitError}
                </div>
              ) : (
                <br className="show-editor-error" />
              )}
            </form>
          )}
        />
      </div>
    </main>
  );
};

export default CreateLoop;
