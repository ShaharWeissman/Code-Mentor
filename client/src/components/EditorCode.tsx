import Editor from "react-simple-code-editor";
import "./EditorCode.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

type Props = {
  language: "js" | "html";
  code: string;
  setCode: (code: string) => void;
};

function EditorCode({ language, code, setCode }: Props) {
  const handleInput = (codeStr: string) => {
    setCode(codeStr);
  };

  return (
    <div className="highlighted-code">
      <Editor
        value={code}
        onValueChange={handleInput}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages[language], language)
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
}

export default EditorCode;
