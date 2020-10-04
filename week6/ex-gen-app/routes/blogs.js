const express = require('express');
const router = express.Router();

pages = require('../data/pages.json');

/* GET users listing. */
router.get('/:blogName', function(req, res, next) {
  if (req.session.saveUninitialized == undefined){
    res.redirect('/login');
  }else{
    var name = req.params.blogName;
  res.render('blog', 
              { title: name,
                content: pages[name],
            });
  }
});

router.post('/:blogName', (req,res) =>{
  var name = req.params.blogName;
  var del = req.body.delete;
  var edi = req.body.edit;
  if (del=="Delete"){
    delete pages[name];
    res.redirect('../../');
  }else if (edi == "Edit"){
    res.redirect('../../edit/'+name);
  }
})

module.exports = router;