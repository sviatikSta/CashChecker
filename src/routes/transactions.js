const router = require("express-promise-router")();

const { transaction } = require("../controllers");

router.route("/:id").get(transaction.get);
router.route("/").post(transaction.create);
router.route("/").get(transaction.getAll);
router.route("/:id").put(transaction.update);
router.route("/:id").delete(transaction.delete);

module.exports = router;
