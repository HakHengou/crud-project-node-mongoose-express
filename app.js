// require('dotenv').config();
require('./config/server');
// require('./src/index')

const express= require("express");
const server = express();
// require('./src/routes')(server);
const userRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const profileRouter = require('./src/routes/profiles')
const roleRouter = require('./src/routes/roles');

server.use(express.json());
server.use('/images',express.static('images'));

// server.use([userRouter,authRouter,profileRouter,roleRouter]);

server.use(roleRouter);
server.use(userRouter);
server.use(authRouter);
server.use(profileRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
