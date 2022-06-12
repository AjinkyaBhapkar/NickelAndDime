const router = require('express').Router();
let Transaction = require('../models/transaction.model');



router.route('/').get((req, res) => {
    
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error' + err));

});
router.route('/:id').get((req, res) => {
    Transaction.findById(req.params.id)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/date/:date').get((req, res) => {
    Transaction.find({ date: req.params.date })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/tags/:tags').get((req, res) => {
    Transaction.find({ tags: { $regex: req.params.tags } })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/type/:type').get((req, res) => {
    Transaction.find({ type: { $regex: req.params.type } })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Transaction.deleteOne({_id:req.params.id})
        .then(transaction => {res.json(transaction)})
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/deleteall').delete((req, res) => {
    Transaction.deleteMany({})
        .then(transaction => {res.json(transaction)})
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