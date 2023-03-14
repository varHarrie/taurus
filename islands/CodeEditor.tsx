import { useEffect, useRef } from "preact/hooks";
import { EditorState } from "https://esm.sh/@codemirror/state@6.2.0";
import { EditorView } from "https://esm.sh/@codemirror/view@6.2.0";
import { javascript } from "https://esm.sh/@codemirror/lang-javascript@6.1.4?target=deno";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark@6.1.1";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor(props: CodeEditorProps) {
  const el = useRef<HTMLDivElement>(null);
  const state = useRef<EditorState>();
  const view = useRef<EditorView>();

  useEffect(() => {
    if (!el.current) return;

    const onUpdate = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        props.onChange(update.state.doc.toString());
      }
    });

    console.log("creating editor");

    state.current = EditorState.create({
      doc: props.value,
      extensions: [javascript({ typescript: true }), oneDark, onUpdate],
    });

    view.current = new EditorView({
      state: state.current,
      parent: el.current,
    });

    return () => view.current?.destroy();
  }, []);

  return <div ref={el}></div>;
}
