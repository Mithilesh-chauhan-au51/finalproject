//port setup for socket.io server for run
const io = require("socket.io")(8900, {
  cors: {
    origin: "https://capstoneproject-client--harry-potter1.repl.co",
  },
});

// Function to add a user to the users array
let users = [];
const addUser = (userId, socketId) => {
  // Check if the user is already present in the array, and add the user if not
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Function to remove a user from the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Function to get user details based on userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};



// Event listener for new socket connections
io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Event listener for user disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

  







