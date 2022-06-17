var router = require("express").Router();

const userController = require('../controllers/user');

router.post("/login", userController.checkLogin);
router.post("/", userController.create);
router.put("/changePassword/:id", userController.changePassword);
router.delete("/:id", userController.delete);

module.exports = router;  