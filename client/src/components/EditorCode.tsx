import { useState } from "react";
import Editor from "react-simple-code-editor";
import "./EditorCode.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

type Props = {
  roomName: string;
  code: string;
  setCode: (code: string) => void;
  setRoomName: (roomName: string) => void;
};

function EditorCode({
  roomName,
  code,
  setCode,
  setRoomName,
}: Props): JSX.Element {
  const handleCodeInput = (codeStr: string) => {
    setCode(codeStr);
  };

  const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleTitleChange = () => {
    setRoomName(roomName);
  };

  return (
    <div>
      <input
        type="text"
        className="title-input"
        value={roomName}
        onChange={handleChangeRoomName}
        placeholder="Change title..."
      />
      <button className="title-button" onClick={handleTitleChange}>
        Change
      </button>
      <div className="highlighted-code">
        <Editor
          value={code}
          onValueChange={handleCodeInput}
          highlight={
            (code) => Prism.highlight(code, Prism.languages[roomName], roomName) //syntax highlight rules
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
    </div>
  );
}

export default EditorCode;
