import { useEffect, useState } from "react";
import RoomList from "../RoomList";
import "./Layout.css";
import socketIoService from "../../Services/SocketIoService";
import EditorCode from "../EditorCode";

export interface CodeBlockDocument {
  _id: string;
  roomName: string;
  language: "js" | "html";
  code: string;
}

function Layout(): JSX.Element {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockDocument[]>([]); //state for codeBlocks documents from server
  const [code, setCode] = useState("");
  const [codeBlock, setCurrentCodeBlock] = useState<CodeBlockDocument>();
  // State check the user's role, either student or mentor
  const [role, setRole] = useState<"student" | "mentor" | null>();

  useEffect(() => {
    console.log("roomName", { codeBlock });
    if (codeBlock) {
      //emitting Join room event
      socketIoService.socket.emit("joinedRoom", { roomId: codeBlock._id });
    }
  }, [codeBlock]);

  useEffect(() => {
    socketIoService.socket.on(
      "codeBlocks",
      ({ collection }: { collection: CodeBlockDocument[] }) => {
        console.log({ collection });
        setCodeBlocks(collection);
      }
    );

    socketIoService.socket.on("sendCode", (data) => {
      setCode(data.code);
    });

    socketIoService.socket.on("codeEdited", (data) => {
      console.log("data:", data);
      setCode(data.code);
    });

    socketIoService.socket.on("role", (data) => {
      console.log("role", data);
      setRole(data.role);
    });
  }, []);

  useEffect(() => {
    console.log("code:", code);
  }, [code]);

  const handleCodeChange = (codeStr: string) => {
    // Allowing only students to edit code
    if (role === "student") {
      setCode(codeStr);
      //emit the updated code to the server
      socketIoService.socket.emit("emitCodeChange", {
        code: codeStr,
        _id: codeBlock?._id,
      });
    }
  };

  return (
    <div className="layout">
      <header>
        <h1>Code Mentor</h1>
      </header>
      <div className="main-container">
        <div className="code-editor">
          <h3>
            {codeBlock
              ? `Room: ${codeBlock.roomName.toUpperCase()}`
              : "Select a room"}
          </h3>
          {/* //allowing editing if user has student role */}
          {role && <h3>Role: {role}</h3>}
          {codeBlock?.language && (
            <EditorCode
              language={codeBlock.language}
              code={code}
              setCode={handleCodeChange}
            />
          )}
        </div>
        <div className="sidebar">
          <div className="code-block">
            <RoomList
              roomList={codeBlocks}
              setCurrentCodeBlock={setCurrentCodeBlock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
