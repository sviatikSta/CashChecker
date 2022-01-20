const router = require("express-promise-router")();

const { chart } = require("../controllers");

router.route("/pie").get(chart.getPieChart);
router.route("/pie/:fromDate/:toDate").get(chart.getPieChart);
router.route("/line").get(chart.getLineChart);
router.route("/line/:fromDate/:toDate").get(chart.getLineChart);

module.exports = router;
