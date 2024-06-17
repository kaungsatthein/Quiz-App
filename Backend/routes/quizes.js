const express = require("express");
const router = express.Router();

const QuizController = require("../controllers/QuizController");

router.get("", QuizController.index);
router.get("/:id", QuizController.show);
router.post("", QuizController.store);
router.delete("/:id", QuizController.remove);
router.patch("/:id", QuizController.update);

module.exports = router;