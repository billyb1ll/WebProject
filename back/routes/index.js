var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello World');
  console.log('Hello World');
});

router.post('/', (req, res) => {
  const { input } = req.body;
  res.send(`Received: ${input}`);
  console.log(`Received: ${input}`);
});

module.exports = router;
