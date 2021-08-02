const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/88913422c6f64e16baeb5ffa01dd2381"))

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "getCalorie",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "calorie",
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
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "calorie",
				"type": "uint256"
			}
		],
		"name": "setCalorie",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];



web3.eth.getBalance("0xe52562dD2f77Fdb4CB37a1c5Cd54cdDAE401a0E3", function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
  })

