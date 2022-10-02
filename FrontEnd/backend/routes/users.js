const router = require('express').Router();
let User = require('../models/user.model');
// const { hash, compare } = require('bcryptjs');
const { hash, compare } = require('bcryptjs');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));

});

router.route('/login').post((req, res) => {
    User.find({ username: req.body.username })
        .then(async user => {
            const isValid = await compare(req.body.password, user[0].password)
            isValid ? 
            (    res.status(200).json(user)    )
            :
            (   res.status(401).json('Invalid username or password')   )
        })
        .catch(() => res.status(404).json("Username doesn't exist"))

});

router.route('/add').post(async (req, res) => {
    const username = req.body.username;
    const password = await hash(req.body.password, 12);

    const newUser = new User({
        username,
        password
    });

    newUser.save()
        .then(() => res.status(201).json('User added!'))
        .catch(err => res.status(400).json('Error:' + err));

});

module.exports = router;