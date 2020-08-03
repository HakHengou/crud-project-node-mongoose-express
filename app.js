require('dotenv').config();
require('./config/server');
// require('./src/index')

const express= require("express");
const server = express();
// require('./src/routes')(server);
const userRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');

server.use(express.json());

server.use(userRouter);
server.use(authRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
