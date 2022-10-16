import "./CreateLoop.css";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import loopit from "../../api/loopit";
import LoadEditor from "../Editor";

const CreateLoop = ({ user_id }) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const onSubmit = async ({ name, description, filename }) => {
    if (code.length > 3000) return null;

    if (!language || language === "default") {
      return { [FORM_ERROR]: "Language is required" };
    }
    if (!code || code === "") {
      return null;
    }

    const params = {
      name,
      content: code,
      language,
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
                <select
                  name="language"
                  className="editor-req"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    console.log(e.target.value);
                    return e.target.innerHTML;
                  }}
                >
                  <option>javascript</option>
                  <option>python</option>
                  <option>c</option>
                  <option>aes</option>
                  <option>apex</option>
                  <option>azcli</option>
                  <option>bat</option>
                  <option>bicep</option>
                  <option>cameligo</option>
                  <option>clojure</option>
                  <option>coffeescript</option>
                  <option>cpp</option>
                  <option>csharp</option>
                  <option>csp</option>
                  <option>css</option>
                  <option>cypher</option>
                  <option>dart</option>
                  <option>dockerfile</option>
                  <option>ecl</option>
                  <option>elixir</option>
                  <option>flow9</option>
                  <option>freemarker2</option>
                  <option>fsharp</option>
                  <option>go</option>
                  <option>graphql</option>
                  <option>handlebars</option>
                  <option>hcl</option>
                  <option>html</option>
                  <option>ini</option>
                  <option>java</option>
                  <option>json</option>
                  <option>julia</option>
                  <option>kotlin</option>
                  <option>less</option>
                  <option>lexon</option>
                  <option>liquid</option>
                  <option>lua</option>
                  <option>m3</option>
                  <option>markdown</option>
                  <option>mips</option>
                  <option>msdax</option>
                  <option>mysql</option>
                  <option>objective-c</option>
                  <option>pascal</option>
                  <option>pascaligo</option>
                  <option>perl</option>
                  <option>pgsql</option>
                  <option>php</option>
                  <option>pla</option>
                  <option>plaintext</option>
                  <option>postiats</option>
                  <option>powerquery</option>
                  <option>powershell</option>
                  <option>proto</option>
                  <option>pug</option>
                  <option>qsharp</option>
                  <option>r</option>
                  <option>razor</option>
                  <option>redis</option>
                  <option>redshift</option>
                  <option>restructuredtext</option>
                  <option>ruby</option>
                  <option>rust</option>
                  <option>sb</option>
                  <option>scala</option>
                  <option>scheme</option>
                  <option>scss</option>
                  <option>shell</option>
                  <option>sol</option>
                  <option>sparql</option>
                  <option>sql</option>
                  <option>st</option>
                  <option>swift</option>
                  <option>systemverilog</option>
                  <option>tcl</option>
                  <option>twig</option>
                  <option>typescript</option>
                  <option>vb</option>
                  <option>verilog</option>
                  <option>xml</option>
                  <option>yaml</option>
                  <option>Plain text</option>
                </select>
              </div>
              <LoadEditor setCode={setCode} language={language} height="40vh" />
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
