import { useEffect, useState } from "react";
import RoomList from "../RoomList";
import "./Layout.css";
import socketIoService from "../../Services/SocketIoService";
import EditorCode from "../EditorCode";

function Layout(): JSX.Element {
  const [roomList, setRoomList] = useState([]);
  const [code, setCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState<"js" | "html">("js");
  const [role, setRole] = useState<"student" | "mentor" | null>();

  useEffect(() => {
    console.log("roomName", roomName);
    if (roomName) {
      socketIoService.socket.emit("joinedRoom", { roomName });
    }
  }, [roomName]);

  useEffect(() => {
    socketIoService.socket.on("roomTitles", ({ titles }) => {
      setRoomList(titles);
    });
    socketIoService.socket.on("sendCode", (data) => {
      setCode(data.code);
      setLanguage(data.language);
    });

    socketIoService.socket.on("role", (data) => {
      console.log("role", data);
      setRole(data.role);
    });
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: Layout.tsx:37 ~ Layout ~ code:", code);
  }, [code]);

  const handleCodeChange = (codeStr: string) => {
    if (role === "student") {
      setCode(codeStr);
      socketIoService.socket.emit("emitCodeChange", {
        code: codeStr,
        roomName,
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
          <h1>
            {roomName ? `Room: ${roomName.toUpperCase()}` : "Select a room"}
          </h1>
          {role && <h2>Role: {role}</h2>}
          {language && (
            <EditorCode
              language={language}
              code={code}
              setCode={handleCodeChange}
            />
          )}
        </div>
        <div className="sidebar">
          <div className="code-block">
            <RoomList roomList={roomList} setRoomName={setRoomName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
