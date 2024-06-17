const mongoose = require("mongoose");

const Quiz = require("../models/Quiz");

const QuizController = {
  index: async (req, res) => {
    const quizes = await Quiz.find();
    return res.json(quizes);
  },

  store: async (req, res) => {
    try {
      const { question, options, answer } = req.body;

      const quiz = await Quiz.create({
        question,
        options,
        answer,
      });

      return res.json(quiz);
    } catch (e) {
      return res.status(400).json({ msg: "Invalid Fields" });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await Quiz.findById(id);
      return res.json(quiz);
    } catch (e) {
      return res.status(404).json({ msg: "Quiz not found." });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid ID." });
      }

      const quiz = await Quiz.findByIdAndDelete(id);

      if (!quiz) {
        return res.status(404).json({ msg: "Quiz is not found" });
      }

      return res.json(quiz);
    } catch (e) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid ID." });
      }

      const quiz = await Quiz.findByIdAndUpdate(id, { ...req.body });

      if (!quiz) {
        return res.status(404).json({ msg: "Quiz is not found" });
      }

      return res.json(quiz);
    } catch (e) {
      return res.status(500).json({ msg: "Internet server error." });
    }
  },
};

module.exports = QuizController;
