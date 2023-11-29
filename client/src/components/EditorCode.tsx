import Editor from "react-simple-code-editor";//https://www.npmjs.com/
import "./EditorCode.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

type Props = {
  language: "js" | "html"; //for syntax highlighting
  code: string;
  setCode: (code: string) => void;
};

function EditorCode({ language, code, setCode }: Props) {
  const handleInput = (codeStr: string) => {
    //sets the updated code string
    setCode(codeStr);
  };

  return (
    <div className="highlighted-code">
      <Editor
        className="code-display"
        value={code}
        onValueChange={handleInput}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages[language], language)
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 13,
        }}
      />
    </div>
  );
}

export default EditorCode;
