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
const TOKEN2 = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0I3M0oiLCJzdWIiOiI5SktUUDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjI3OTkzMjE0LCJpYXQiOjE2Mjc5NjQ0MTR9.KqrR28mFhEQZjc_hZPPLAiYEFIYQtu3a8achP6RLJrA`;
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
CONFIG2.url = `/user/-/activities/calories/date/today/1d.json`;

let dateTime = new Date();
var dT = dateTime.toFormat("YYYY-MM-DD");
var data = {};
var val1, val2;

axios.request(CONFIG1).then((res1) => {
    val1 = res1.data['activities-tracker-calories'][0]['value'];
    data[`calories.${dT}`] = Number(val1);
    console.log(data);
    const res = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data);
}).catch((error) => {
    console.log(error);
});
axios.request(CONFIG2).then((res2) => {
    val2 = res2.data['activities-calories'][0]['value'];
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
    data1[`balance_trace.${dT}`] = Number(val1-val2);
    console.log(data1);
    const res1 = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data1);
    data2[`balance_trace.${dT}`] = Number(val2-val1);
    const res2 = db.collection('users').doc('y1ThA6QLVAbt3BzsXaWTFSfBysk1').update(data2);
}else if(val1<val2){
    fight('y1ThA6QLVAbt3BzsXaWTFSfBysk1','AumGFGYh9wPRUMR4C8TzlHojNuo1',val2-val1);
    data1[`balance_trace.${dT}`] = Number(val2-val1);
    console.log(data1);
    const res1 = db.collection('users').doc('AumGFGYh9wPRUMR4C8TzlHojNuo1').update(data1);
    data2[`balance_trace.${dT}`] = Number(val1-val2);
    const res2 = db.collection('users').doc('y1ThA6QLVAbt3BzsXaWTFSfBysk1').update(data2);
}