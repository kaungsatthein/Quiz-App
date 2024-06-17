const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  highscore: {
    type: Number,
    default: 0
  }
});

UserSchema.statics.register = async function (name, email, password) {
  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("User already exits.");
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await this.create({
    name,
    email,
    password: hash,
  });

  return user;
};

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if(!user) {
        throw new Error("Please register first.");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if(!isCorrect) {
        throw new Error("Invalid email or password")
    }
    return user;
}

module.exports = mongoose.model("User", UserSchema);
