const express = require('express');
const router = express.Router();

const users = require('../data/users.json');
/* GET users listing. */
router.get('/', (req, res, next) =>{
  res.render('login',{
        title:'Welcome',
        content: 'Please enter the following',
        form: {username:'',password:''}
    });
});

router.post('/', (req, res, next) => {
    var usr = req.body.username;
    var pw = req.body.password;
    if (usr in users && users[usr] == pw){
        req.session.saveUninitialized = true;
        res.redirect('../');
    }else{
        res.render('login',{
            title:'Welcome',
            content: 'You entered a wrong username or password. Please try again.',
            form: {username:'',password:''}
        });
    }
});

module.exports = router;