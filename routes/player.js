var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res) {
  const name = req.params.name;
  res.json({'player': name});
});

module.exports = router;
