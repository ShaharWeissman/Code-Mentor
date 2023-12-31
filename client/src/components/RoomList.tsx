import "./RoomList.css";
import { CodeBlockDocument } from "./layout/Layout";

type Props = {
  roomList: CodeBlockDocument[]; //the list of codeBlocks documents
  setCurrentCodeBlock: (codeBlock: CodeBlockDocument) => void;
};

function RoomList({ roomList, setCurrentCodeBlock }: Props) {
  //function to cope with selection of codeBlocks
  const handleRoomSelect = (codeBlock: CodeBlockDocument) => {
    setCurrentCodeBlock(codeBlock);
  };
  return (
    <div>
      <span className="room-list-title">Rooms:</span>
      <br/>
      {roomList.map((room) => (
        <div
          className="room-btn"
          key={room._id}
          onClick={() => handleRoomSelect(room)}>
          {room.roomName.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default RoomList;
