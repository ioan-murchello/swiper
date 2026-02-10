import Message from "../models/message.model.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const sendMessageHandler = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const senderId = req.user.id;

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await newMessage.save();

    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", { message: newMessage });
    }
    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.log("Error in sendMessageHandler controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getConversationHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log("Error in getConversationHandler controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
