const express = require("express");
const router = express.Router();

// dummy route for testing
router.get("/", (req, res) => {
  res.send("Events route working!");
});

module.exports = router;
