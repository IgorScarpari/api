var router = require("express").Router();

const reserveController = require('../controllers/reserve');

//add routers
//router.get("/", reserveController.checkReserve);
router.get("/", reserveController.findAll);
//router.get("/", reserveController.findByUser);
//router.get("/", reserveController.findByBook);
//router.post("/", reserveController.create);
//router.put("/", reserveController.update);
//router.put("/", reserveController.delete);

module.exports = router;