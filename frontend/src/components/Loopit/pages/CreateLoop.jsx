import "./CreateLoop.css";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const CreateLoop = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  return (
    <>
      <div className="editor-container">
        <h1 className="heading-creator">Create your loop!</h1>
        <Editor
          height="50vh"
          language="javascript"
          theme="vs-dark"
          loading={<p>Loading...</p>}
          options={{
            fontFamily: "Consolas",
            showUnused: true,
            tabSize: 2,
            suggest: {
              preview: true,
              previewMode: "prefix",
              showClasses: true,
            },
          }}
          editorDidMount={handleEditorDidMount}
        />
      </div>
    </>
  );
};

export default CreateLoop;
