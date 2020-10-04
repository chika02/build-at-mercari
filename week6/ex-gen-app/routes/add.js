const express = require('express');
const router = express.Router();
const fs = require("fs");

const pages = require('../data/pages.json');
var msg = "Enter your comments in the box below.";
var title = "Add / Edit Blogs";

router.get('/', function(req, res, next) {

  if (req.session.saveUninitialized == undefined){
    res.redirect('/login');
  }else{
    var name = req.params.blogName;
    res.render('edit', 
                { title: title,
                  content: msg,
                  blogtitle: '',
                  blogtext: ''
            });
  }
});

router.post('/', (req,res) =>{
    var blogtitle = req.body.blogtitle;
    var blogtext = req.body.blogtext;
    
    if (blogtitle in pages){
        res.render('edit', 
                  { title: title,
                    content: "Please enter a different blog title.",
                    blogtitle: "",
                    blogtext: ""
                });
    }else{
        pages[blogtitle] = blogtext;
        fs.writeFile('data/pages.json', JSON.stringify(pages), (err) => {
            if (err){
              console.log(err);
              throw err;
            }
        });
    res.redirect('../');}
});

module.exports = router;