//import Conversation model
const Conversation = require("../models/Conversation");




const Newcon = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  // Check if senderId and receiverId exist
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Invalid senderId or receiverId' });
  }

  // Check if senderId and receiverId already exist in a conversation
  const existingConversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existingConversation) {
    return res.status(200).json({ message: 'Conversation already exists' });
  }

  // Create and save the new conversation
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json({ message: 'Conversation saved' });
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
};



const Getconuser=  async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
}





module.exports ={Newcon,Getconuser}