const http = require("http");

const app = require("./server");

//# Database
const db = require("./database");

//! Initiate DB Connection
db.init();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server Listening on PORT::${PORT}...`);
  });
}

startServer();
