import Chat from "../Models/chatModel.js";
import Message from "../Models/messageModel.js";
import User from "../Models/userModel.js";

export const Sendmessage = async (req, res) => {
  const { content, chatId } = req.body;
  
  var newMessage = {
    sender: req.user._id,
    content,
    chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name profilePic");
    message = await message.populate("chatId");
    message = await message.populate("chatId.users", "name profilePic email");

    await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: message,
      },
      { new: true }
    );

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Allmessages = async (req, res) => {
  try{
    const messages = await Message.find({chatId : req.params.id}).populate("sender" , "name profilePic").populate("chatId")
    res.status(200).json(messages)

  }catch(err){
    res.status(500).json(err);
  }
};
