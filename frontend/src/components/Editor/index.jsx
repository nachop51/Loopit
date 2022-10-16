import Editor from "@monaco-editor/react";
import LoadingSpinner from "../../assets/nobg.gif";
import { useRef } from "react";

const LoadEditor = ({ width, height, language, setCode }) => {
  const editorRef = useRef(null);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <Editor
      height={height}
      language={language || "javascript"}
      theme="vs-dark"
      loading={<img src={LoadingSpinner} alt="Spinner" className="spinner" />}
      options={{
        fontFamily: "Consolas",
        showUnused: true,
        tabSize: 2,
      }}
      onMount={handleEditorDidMount}
      defaultValue={"// here goes your code\n"}
      onChange={handleEditorChange}
    />
  );
};

export default LoadEditor;
