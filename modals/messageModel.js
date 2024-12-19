const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure receiver is always specified
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    type: {
      type: String,
      enum: ["text", "file"], // Distinguishes between text and file messages
      default: "text",
    },
    fileUrl: {
      type: String, // Stores the file URL for file messages
      required: function () {
        return this.type === "file";
      },
    },
    isFile: { type: Boolean, default: false },
    fileName: { type: String }, // Original file name
    fileSize: { type: Number }, // File size in bytes
    fileContent: {
      type: String, // Base64-encoded content for inline previews
      required: function () {
        return this.type === "file";
      },
    },
  },
  {
    timestamps: true, // Corrected option name
  }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
