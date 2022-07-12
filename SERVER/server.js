// parameters of this function - (port where we want to run our code , 3001 NOTE : client is on 3000)
// so our client and server are on different urls 3000 & 3001
// So we need to use // !cors - cross origin report support that allow us to make req from diff to diff url

// since our server and client are on different locations so we need to specify properly

//io object allows us to do the connection
const io = require("socket.io")(3001, {
  cors: {
    // specify the origin i.e. client and methods
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// everytime client connects this will run

io.on("connection", (socket) => {
  // calls get document
  socket.on("get-document", (documentId) => {
    const data = "";
    // joins room
    socket.join(documentId);
    //emits data to client
    socket.emit("load-document", data);

    socket.on("send-changes", (delta) => {
      // console.log(delta);
      socket.broadcast.to(documentId).emit("received-changes", delta);
    });

    // socket.on("save-document", async (data) => {
    //   await Document.findByIdAndUpdate(documentId, { data });
    // });
  });
});
