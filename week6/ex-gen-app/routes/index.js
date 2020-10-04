const express = require('express');
const router = express.Router();
const fs = require("fs");

const pages = require('../data/pages.json');
var msg = "This is Index Page!";
var title = "Chiki Biki";

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.saveUninitialized == undefined){
    res.redirect('/login');
  }else{
    res.render('index', 
              { title: title,
                content: msg,
                data: pages
            });
  }
});
router.post('/', (req,res) =>{
  res.redirect('/add');
})

module.exports = router;
