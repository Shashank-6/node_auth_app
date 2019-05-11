const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcrypt");

const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});
// hash user password before saving into database
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", UserSchema);
