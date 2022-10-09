import "./CreateLoop.css";
import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import LoadingSpinner from "../../../assets/loading_spinner.gif";

const CreateLoop = () => {
  // const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // console.log(editor, monaco);
    editorRef.current = editor;
  }

  const handleSave = () => {
    const valueEditor = editorRef.current.getValue();
    alert(`contenido enviado: ${valueEditor}`);
    // fetch("/apí/save", )
  };

  // Guardamos la información ingresada en un estado
  // const [content, setContent] = useState("");

  return (
    <>
      <div className="editor-container">
        <h1 className="heading-creator">Create your loop!</h1>
        <Editor
          height="50vh"
          language="javascript"
          theme="vs-dark"
          loading={
            <img src={LoadingSpinner} alt="Spinner" className="spinner" />
          }
          // onChange={(value) => setContent(value)}
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
          onMount={handleEditorDidMount}
        />
        <button className="btn btn-lily save-button" onClick={handleSave}>
          Create loop
        </button>
      </div>
    </>
  );
};

export default CreateLoop;
