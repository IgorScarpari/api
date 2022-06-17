var router = require("express").Router();

const booksController = require('../controllers/book');

router.get("/", booksController.findAll);
router.get("/:id", booksController.findOne);
router.post("/", booksController.create);
router.put("/:id", booksController.update);
router.delete("/:id", booksController.delete);

module.exports = router;  