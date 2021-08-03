const Web3 = require("web3");
const ethNetwork = 'http://127.0.0.1:8501';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const sender_addr = "0x197f5ba63db7843eca69ae1d0b60a1a532de682b";
const contract_addr = "0x172064f6115655a0FdEB7300dFCD85F7bDF605bf";

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

function setMoney(name, money){
    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.setMoney(name, money).send({
        from: sender_addr
    }).then(function (result) {
        console.log(result);
    });
};

function getBalance(name){
    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.getBalance(name).call({
        from: sender_addr
    }).then(function (result) {
        console.log(result);
    });
};

function fight(winner, loser, money){
    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.fight(winner, loser, money).send({
        from: sender_addr
    }).then(function (result) {
        console.log(result);
    });
};

//setMoney("AumGFGYh9wPRUMR4C8TzlHojNuo1", 100000);
//setMoney("y1ThA6QLVAbt3BzsXaWTFSfBysk1", 200000);
getBalance("AumGFGYh9wPRUMR4C8TzlHojNuo1");
getBalance("y1ThA6QLVAbt3BzsXaWTFSfBysk1");
//fight("AumGFGYh9wPRUMR4C8TzlHojNuo1", "y1ThA6QLVAbt3BzsXaWTFSfBysk1", 350);
