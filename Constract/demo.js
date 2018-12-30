window.onload = function () {

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // Set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }



    var abi = [{
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
        }, {
            "name": "add",
            "type": "address"
        }],
        "name": "addNewProject",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "name",
            "type": "string"
        }, {
            "name": "add",
            "type": "address"
        }],
        "name": "addNewJoiner",
        "outputs": [{
            "name": "a",
            "type": "address"
        }, {
            "name": "aname",
            "type": "string"
        }, {
            "name": "times",
            "type": "uint8"
        }, {
            "name": "projects",
            "type": "address[]"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
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
            "name": "times",
            "type": "uint8"
        }, {
            "name": "add",
            "type": "address"
        }],
        "name": "addNewPublisher",
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
    }];

    var addresss = "0xa1cf4603280debf38fe6ec62f21a8d05eda82d06";

    let fr = web3.eth.accounts[0];
    console.log(fr);
    if (web3.isConnected())
        console.log("ok");
    let plant = web3.eth.contract(abi).at(addresss)
    console.log(plant);

    let regester_button = document.getElementById("regester");


    jump = function () {

        console.log(this);
    }

    let addinproject_button = document.getElementById("addInProject");

    var showJoiner = function () {
        plant.showJoiner();
        console.log(d);

    }

    addinproject_button.onclick = showJoiner;


};