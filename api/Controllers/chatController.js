import Chat from "../Models/chatModel.js";
import User from "../Models/userModel.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  try {
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name profilePic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatname: "sender",
        isGroupChat: false,
        users: [req.user._id.toString(), userId],
      };

      const createChat = await Chat.create(chatData);
      const fullchat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullchat);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const fetchChat = async (req, res) => {
  try {
    var findchat = await Chat.find({
      users: { $elemMatch: { $eq: req.params.id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    findchat = await User.populate(findchat, {
      path: "latestMessage.sender",
      select: "name profilePic email",
    });

    res.status(200).send(findchat);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createGroupchat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json("please Fill All the Form");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).json("More than two Users Require To Make a Group");
  }
  users.push(req.user);

  try {
    const creatGroup = await Chat.create({
      chatname: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const FullGroupchat = await Chat.findOne({ _id: creatGroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(FullGroupchat);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatname } = req.body;
    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatname },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(updateChat);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const AddtoGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const adduser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!adduser) {
      return res.status(500).json("Chat Not Found");
    }

    res.status(200).json(adduser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeuser = async (req, res) => {
  const { chatId, userId } = req.body;
  try {

    const removeuser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removeuser) {
      return res.status(500).json("Chat Not Found");
    }

    res.status(200).json(removeuser);
  } catch (err) {
    res.status(500).json(err);
  }
};
