import CodeBlock, { ICodeBlock } from "../models/icodeblocks.model";

//Fetch a codeBlock by the its id
export async function getCodeBlock(_id: string): Promise<ICodeBlock> {
  try {
    const codeBlock = await CodeBlock.findOne({ _id });
    return codeBlock;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//Fetch all codeBlocks
export async function getAllCodeBlocks(): Promise<ICodeBlock[]> {
  try {
    const codeBlock = await CodeBlock.find({});
    return codeBlock;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//Update the codeBlock based on _id
export async function updateCodeBlock(
  code: string,
  _id: string
): Promise<ICodeBlock | null> {
  try {
    // Find the code block document by room name
    const codeBlock = await CodeBlock.findOneAndUpdate({ _id });

    if (codeBlock) {
      // Update the code field
      codeBlock.code = code;
      console.log("Updated codeBlock:", codeBlock);
      // Save the updated document
      await codeBlock.save();
      console.log("CodeBlock saved successfully!");

      return codeBlock;
    } else {
      // Handle case where no document is found
      console.log(`No code block found for room: ${_id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error updating code block in room ${_id}:`, error);
    return null;
  }
}
