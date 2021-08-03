const express = require('express');
var router = express.Router();

const Web3 = require("web3");
const ethNetwork = 'http://127.0.0.1:8501';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const sender_addr = "0x197f5ba63db7843eca69ae1d0b60a1a532de682b";
web3.eth.personal.unlockAccount(sender_addr, "password1", 15000).then(console.log('Account unlocked!'));
const contract_addr = "0x4c404FC14365bF4151fB00881644Dbc7C5816D3C";

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "winnerId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "loserId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "money",
                "type": "uint256"
            }
        ],
        "name": "fight",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "userId",
                "type": "string"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "money",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "userId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "money",
                "type": "uint256"
            }
        ],
        "name": "setMoney",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

//setMoney("AumGFGYh9wPRUMR4C8TzlHojNuo1", 100000);
//setMoney("y1ThA6QLVAbt3BzsXaWTFSfBysk1", 200000);
//getBalance("AumGFGYh9wPRUMR4C8TzlHojNuo1");
//getBalance("y1ThA6QLVAbt3BzsXaWTFSfBysk1");
//fight("AumGFGYh9wPRUMR4C8TzlHojNuo1", "y1ThA6QLVAbt3BzsXaWTFSfBysk1", 350);


router.get('/getBalance', (req, res, next) => {
    const name = req.body["userId"];

    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.getBalance(name).call({
        from: sender_addr
    }).then(function(result){
        let ret = {
            user_id: name,
            balance: Number(result)
        };
        console.log(ret);
        res.json(ret);
    });
})

router.post('/setMoney', (req, res, next) => {
    const name = req.body["userId"];
    const money = req.body["money"];

    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.setMoney(name, money).send({
        from: sender_addr
    }).then(function (result) {
        res.send("POST request to setMoney");
    });
})

router.post('/fight', (req, res, next) => {
    const winner = req.body["winnerId"];
    const loser = req.body["loserId"];
    const money = req.body["money"];

    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.fight(winner, loser, money).send({
        from: sender_addr
    }).then(function (result) {
        res.send("POST request to fight");
    });
})

module.exports = router;