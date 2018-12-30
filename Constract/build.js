var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8481"));
}

var abi = [{
    "constant": false,
    "inputs": [{
        "name": "project",
        "type": "address"
    }],
    "name": "finishProject",
    "outputs": [{
        "name": "isSend",
        "type": "bool"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "fromP",
        "type": "address"
    }, {
        "name": "toJ",
        "type": "address"
    }, {
        "name": "times",
        "type": "uint8"
    }],
    "name": "send",
    "outputs": [{
        "name": "isSend",
        "type": "bool"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "showJoiner",
    "outputs": [{
        "name": "a",
        "type": "address"
    }, {
        "name": "name",
        "type": "string"
    }, {
        "name": "times",
        "type": "uint8"
    }, {
        "name": "projects",
        "type": "address[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "name",
        "type": "string"
    }],
    "name": "addNewJoiner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "showPublisher",
    "outputs": [{
        "name": "a",
        "type": "address"
    }, {
        "name": "name",
        "type": "string"
    }, {
        "name": "times",
        "type": "uint8"
    }, {
        "name": "projects",
        "type": "address[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "name",
        "type": "string"
    }, {
        "name": "projectTime",
        "type": "uint8"
    }, {
        "name": "count",
        "type": "uint8"
    }, {
        "name": "jobTime",
        "type": "uint8"
    }, {
        "name": "publisher",
        "type": "address"
    }],
    "name": "addNewProject",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "showProject",
    "outputs": [{
        "name": "a",
        "type": "address"
    }, {
        "name": "name",
        "type": "string"
    }, {
        "name": "publisher",
        "type": "address"
    }, {
        "name": "joiner",
        "type": "address[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "joiner",
        "type": "address"
    }, {
        "name": "project",
        "type": "address"
    }],
    "name": "AddInProject",
    "outputs": [{
        "name": "isJoined",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "name",
        "type": "string"
    }, {
        "name": "times",
        "type": "uint8"
    }],
    "name": "addNewPublisher",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}];

var addresss = "0xa1cf4603280debf38fe6ec62f21a8d05eda82d06";

let from = web3.eth.accounts[0];
console.log(from);
if (web3.isConnected())
    console.log("ok");
let plant = web3.eth.contract(abi).at(addresss)
//console.log(plant);
plant.addNewJoiner("zhang", {
    from: from
});
var joiner = plant.showJoiner();

console.log(joiner[0]);