import mongoose, { Document, Schema } from "mongoose";

type CodeLanguage = "js" | "html";

// Interface to describe a code block
export interface ICodeBlock extends Document {
  roomName: string;
  language: CodeLanguage;
  code: string;
}

// Mongoose schema for a code block
const codeBlockSchema: Schema = new Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Creating the model
const CodeBlock = mongoose.model<ICodeBlock>(
  "CodeBlock",
  codeBlockSchema,
  "code-blocks"
);

export default CodeBlock;
