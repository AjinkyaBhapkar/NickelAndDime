const router = require('express').Router();
let Transaction = require('../models/transaction.model');



router.route('/user/:username').get((req, res) => {

    Transaction.find({ username: req.params.username })
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error' + err));

});
router.route('/transaction/:username/:id').get((req, res) => {
    Transaction.find({ $and: [{ username: req.params.username }, { _id: req.params.id }] })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/date/:username/:date').get((req, res) => {
    Transaction.find({ $and: [{ date: req.params.date }, { username: req.params.username }] })

        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/tags/:username/:tags').get((req, res) => {
    Transaction.find({ $and: [{ username: req.params.username }, { tags: { $regex: req.params.tags } }] })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/type/:username/:type').get((req, res) => {
    Transaction.find({ $and: [{ username: req.params.username }, { type: { $regex: req.params.type } }] })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:username/:id').delete((req, res) => {
    Transaction.deleteOne({ $and: [{ username: req.params.username }, { _id: req.params.id }] })
        .then(() => res.json('Transaction deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/deleteall').delete((req, res) => {
    Transaction.deleteMany({})
        .then(transaction => { res.json(transaction) })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Transaction.updateOne(
        { _id: req.params.id },
        {
            $set: {
                username:req.body.username,
                type:req.body.type,
                amount:req.body.amount,
                description:req.body.description,
                tags:req.body.tags,
                date:req.body.date,
            }
        })
        .then(() => { res.json('Transaction Updated! ') })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const type = req.body.type;
    const amount = Number(req.body.amount);
    const description = req.body.description;
    const tags = req.body.tags;
    const date = Date.parse(req.body.date);

    const newTransaction = new Transaction({
        username,
        type,
        amount,
        description,
        tags,
        date,
    });

    newTransaction.save()
        .then(() => res.json('Transaction added!'))
        .catch(err => res.status(400).json('Error:' + err));

});

module.exports = router;