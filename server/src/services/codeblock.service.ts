import CodeBlock, { ICodeBlock } from "../models/idCodeBlock.model";

export async function getCodeBlocks(roomName: string): Promise<ICodeBlock> {
  try {
    const codeBlock = await CodeBlock.findOne({ roomName: roomName });
    return codeBlock;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRoomTitles(): Promise<string[]> {
  try {
    const codeBlocks = await CodeBlock.find({}, "title"); // Fetch only the 'title' field
    const titles = codeBlocks.map((block) => block.title);
    return titles;
  } catch (error) {
    console.error("Error fetching room titles:", error);
    return [];
  }
}

export async function updateCodeBlock(
  code: string,
  roomName: string
): Promise<ICodeBlock | null> {
  try {
    // Find the code block document by room name
    const codeBlock = await CodeBlock.findOne({ roomName: roomName });

    if (codeBlock) {
      // Update the code field
      codeBlock.code = code;

      // Save the updated document
      await codeBlock.save();

      return codeBlock;
    } else {
      // Handle case where no document is found
      console.log(`No code block found for room: ${roomName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error updating code block in room ${roomName}:`, error);
    return null;
  }
}
export async function updateCodeBlockTitle(
  title: string,
  newRoomName: string
): Promise<ICodeBlock | null> {
  try {
    const codeBlock = await CodeBlock.findOne({ roomName: title });

    if (codeBlock) {
      codeBlock.title = newRoomName;
      await codeBlock.save();
      return codeBlock;
    } else {
      console.log(`No document found for room: ${title}`);
      return null;
    }
  } catch (error) {
    console.error(
      `Error updating room name to ${newRoomName}: ${error.message}`
    );
    return null;
  }
}
