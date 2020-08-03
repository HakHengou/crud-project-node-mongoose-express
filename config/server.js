const mongoose = require('mongoose');
const dotEnv = require('dotenv');

dotEnv.config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});