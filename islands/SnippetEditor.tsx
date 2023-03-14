import { useState } from "preact/hooks";
import CodeEditor from "./CodeEditor.tsx";

export default function SnippetEditor() {
  const [value, setValue] = useState("test");

  return (
    <>
      <div>{value}</div>
      <CodeEditor value={value} onChange={setValue} />
    </>
  );
}
