const express = require('express');
const phrase = require('./phrase')
const utils = require('../lib/utils')
const router = express.Router();
router.get('/word', async (req, res) => {
    let suggestions = await utils.wordSuggestion(req.query.text);
    const others = suggestions.splice(1,suggestions.length-1);
    res.json({
      status: 200,
      message: 'OK',
      favorite: suggestions,
      others
    });
});

router.get('/phrase', async (req,res) => {
  const words = req.body.message.split(" ");
  let phraseArr = [];
  let values = await Promise.all(
    words.map(async word => {
    let suggestions = await utils.wordSuggestion(word);
    return suggestions[0];
  }))
  // .then((values)=>{
  //   console.log(values);
  // }); 
  
  res.json({
    status: 200,
    message: 'OK',
    translation: values.join(" "),
  });
});

module.exports = router;
