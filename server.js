const http = require("http");

const app = require("./app");

//# Database
const db = require("./database");

//! Initiate DB Connection
db.init();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server Listening on PORT::${PORT} !!!`);
});
