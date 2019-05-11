const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/node-auth-app";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
