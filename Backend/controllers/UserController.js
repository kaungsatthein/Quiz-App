const mongoose = require("mongoose");

const User = require("../models/User");
const createToken = require("../helpers/createToken");

const UserController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.register(name, email, password);
      const token = createToken(user._id);
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  verify: async (req, res) => {
    return res.json(req.user);
  },
  index: async (req, res) => {
    const users = await User.find();
    return res.json(users);
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      return res.json(user);
    } catch (e) {
      return res.status(404).json({ msg: "User not found." });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid ID." });
      }

      const user = await User.findByIdAndUpdate(id, { ...req.body });

      if (!user) {
        return res.status(404).json({ msg: "User is not found" });
      }

      return res.json(user);
    } catch (e) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid ID." });
      }

      const user = await User.findByIdAndUpdate(id, { ...req.body });

      if (!user) {
        return res.status(404).json({ msg: "User is not found" });
      }

      return res.json(user);
    } catch (e) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid ID." });
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ msg: "User is not found" });
      }

      return res.json(user);
    } catch (e) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },
};

module.exports = UserController;
