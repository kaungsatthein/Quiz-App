const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth")

const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/verify", auth, UserController.verify);
router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.remove);
router.patch("/admin/:id", UserController.updateAdmin);

module.exports = router;