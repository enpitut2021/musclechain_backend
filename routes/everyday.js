const Web3 = require("web3");
const ethNetwork = 'http://127.0.0.1:8501';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const sender_addr = "0x6ac5cc129B2DB47739E1469Eb8574c08e8C38BC8";
const contract_addr = "0x74e011566B780CF70F9e2C346dcE2875d86dE220";

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

function fight(winner, loser, money){
    var pollingContract = new web3.eth.Contract(abi, contract_addr);
    pollingContract.methods.fight(winner, loser, money).send({
        from: sender_addr
    }).then(function (result) {
        console.log(result);
    });
};

const axios = require('axios');
require('date-utils');

const TOKEN1 = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkM4SkoiLCJzdWIiOiI5ODM5R0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI4MTQyOTkxLCJpYXQiOjE2Mjc1MzgyMzl9.jLRirQcyAP8jzSMJaQDM3bFen9THCZ7npzAIShApZNc`;
const TOKEN2 = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0I3M0oiLCJzdWIiOiI5SktUUDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI3OTMwMTI1LCJpYXQiOjE2Mjc5MDEzMjV9.2zxEbQj-MkUUdexGsCYsmZUmtgZYkUj5C_tOEfFVoBM`;
const CONFIG1 = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: { 'Authorization': `Bearer ${TOKEN1}` }
}
const CONFIG2 = {
    baseURL: 'https://api.fitbit.com/1',
    url: ``,
    method: 'get',
    headers: { 'Authorization': `Bearer ${TOKEN2}` }
}

const admin = require('firebase-admin');
const serviceAccount = require('../firebase_key/firebase_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

CONFIG1.url = `/user/-/activities/tracker/calories/date/today/1d.json`;
CONFIG2.url = `/user/-/activities/tracker/calories/date/today/1d.json`;

let dateTime = new Date();
var dT = dateTime.toFormat("YYYY-MM-DD");
var data = {};

axios.request(CONFIG1).then((res1) => {
    let val1 = res1.data['activities-tracker-calories'][0]['value'];
    data[`calories.${dT}`] = Number(val1);
    console.log(data);
    const res = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data);
}).catch((error) => {
    console.log(error);
});
axios.request(CONFIG2).then((res2) => {
    let val2 = res2.data['activities-tracker-calories'][0]['value'];
    data[`calories.${dT}`] = Number(val2);
    console.log(data);
    const res = db.collection('users').doc('y1ThA6QLVAbt3BzsXaWTFSfBysk1').update(data);
}).catch((error) => {
    console.log(error);
});

var data1 = {};
var data2 = {};

if(val1>val2){
    fight('AumGFGYh9wPRUMR4C8TzlHojNuo1','y1ThA6QLVAbt3BzsXaWTFSfBysk1',val1-val2);
    data1[`calories.${dT}`] = Number(val1-val2);
    console.log(data1);
    const res = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data1);
    data2[`calories.${dT}`] = Number(val2-val1);
    const res = db.collection('users').doc('y1ThA6QLVAbt3BzsXaWTFSfBysk1').update(data2);
}else if(val1<val2){
    fight('y1ThA6QLVAbt3BzsXaWTFSfBysk1','AumGFGYh9wPRUMR4C8TzlHojNuo1',val2-val1);
    data1[`calories.${dT}`] = Number(val2-val1);
    console.log(data1);
    const res = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data1);
    data2[`calories.${dT}`] = Number(val1-val2);
    const res = db.collection('users').doc('y1ThA6QLVAbt3BzsXaWTFSfBysk1').update(data2);
}