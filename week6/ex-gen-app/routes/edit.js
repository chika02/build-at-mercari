const express = require('express');
const router = express.Router();
const fs = require("fs");

const pages = require('../data/pages.json');
var msg = "Enter your comments in the box below.";
var title = "Add / Edit Blogs";

router.get('/:blogName', function(req, res, next) {
    if (req.session.saveUninitialized == undefined){
      res.redirect('/login');
    }else{
      var name = req.params.blogName;
    res.render('edit', 
                { title: name,
                  content: msg,
                  blogtitle: name,
                  blogtext: pages[name]
              });
    }
});

router.post('/', (req,res) =>{
    var blogtitle = req.body.blogtitle;
    var blogtext = req.body.blogtext;

    //TO DO: if blogtitle is already taken return error;
    pages[blogtitle] = blogtext;
    fs.writeFile('data/pages.json', JSON.stringify(pages), (err) => {
        if (err){
          console.log(err);
          throw err;
        }
    });
    res.redirect('../');
});

module.exports = router;