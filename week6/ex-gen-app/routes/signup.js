//
// THIS FILE IS NOT USED
//
//

var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');

/* GET users listing. */
router.get('/', (req, res, next) =>{
  res.render('auth',{
        title:'Welcome',
        content: 'Please enter the following',
        form: {username:'',password:''}
    });
});

router.post('/', (req, res, next) => {
    check('username', 'please enter your username').notEmpty();
    check('password', 'please enter your password').notEmpty();

    var result = validationResult(req);
    if (!result.isEmpty()){
        var re = '<ul class="error">';
        var results = result.array();
        for (var n in results){
            re += '<li>'+results[n].msg + '</li>';
        }
        re += '</ul>';
        res.render('/', {
            title: 'Welcome',
            content: re,
            form: req.body
        });
    } else {
        res.redirect('/');
    };
});

module.exports = router;