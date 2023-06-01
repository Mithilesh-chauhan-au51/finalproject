//import message model
const Message = require("../models/Message");

//define Postmessage function for post message
const Postmessage= async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}




//define Getmessage function
const Getmessage=async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports ={Postmessage,Getmessage}