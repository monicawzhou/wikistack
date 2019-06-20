const express = require('express');
const router = express.Router();

router.get('/wiki', (req, res) => {
  console.log('wiki is working');
});

module.exports = router;
