// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import {
  default as Web3
} from 'web3'
import {
  default as contract
} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
//import metaCoinArtifact from '../../build/contracts/MetaCoin.json'
import plantArtifact from '../../build/contracts/Plant.json'


// MetaCoin is our usable abstraction, which we'll use through the code below.
// const MetaCoin = contract(metaCoinArtifact)

const Plant = contract(plantArtifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account
let joiner;
let publisher;

const App = {
  start: function () {
    const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    Plant.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]

      console.log(accounts);
      self.setStatus("ready");
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  // refreshBalance: function () {
  //   const self = this

  //   let meta
  //   MetaCoin.deployed().then(function (instance) {
  //     meta = instance
  //     return meta.getBalance.call(account, {
  //       from: account
  //     })
  //   }).then(function (value) {
  //     const balanceElement = document.getElementById('balance')
  //     balanceElement.innerHTML = value.valueOf()
  //   }).catch(function (e) {
  //     console.log(e)
  //     self.setStatus('Error getting balance; see log.')
  //   })
  // },

  // sendCoin: function () {
  //   console.log("click");
  //   const self = this

  //   const amount = parseInt(document.getElementById('amount').value)
  //   const receiver = document.getElementById('receiver').value

  //   this.setStatus('Initiating transaction... (please wait)')

  //   let meta
  //   MetaCoin.deployed().then(function (instance) {
  //     meta = instance
  //     return meta.sendCoin(receiver, amount, {
  //       from: account
  //     })
  //   }).then(function () {
  //     self.setStatus('Transaction complete!')
  //     self.refreshBalance()
  //   }).catch(function (e) {
  //     console.log(e)
  //     self.setStatus('Error sending coin; see log.')
  //   })
  // },

  //create Joiner 
  //params:name
  addNewJoiner: function () {
    const self = this;
    let joinerName = document.getElementById("joinerName").value;
    let meta;

    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.addNewJoiner.sendTransaction(joinerName, {
        from: accounts[1],
        gas: 3000000
      });
    }).then(function () {
      self.setStatus('addNewJoiner ok!');
      console.log('addNewJoiner ok!');
    }).catch(function (e) {
      console.log(e);
      self.setStatus('addNewJoiner error!');
    })
  },
  //show Joiner
  showJoiner: function () {
    const self = this;
    let meta;

    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showJoiner.call({
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showJoiner ok");
      console.log(value);
      joiner = value;
      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("time:" + value[2]);
      console.log("project:" + value[3]);
      let detail = document.getElementById("divjoinerdetail");
      let ulitem = detail.childNodes[1];
      ulitem.childNodes[1].innerHTML = 'add:' + value[0];
      ulitem.childNodes[3].innerHTML = 'joiner名字:' + value[1];
      ulitem.childNodes[5].innerHTML = 'joiner公益时:' + value[2];
      ulitem.childNodes[7].innerHTML = 'joiner加入的项目' + value[3];
      return;
    }).then(function (e) {
      console.log(e);
    });

  },
  //show Joiner by address
  showAJoiner: function () {
    const self = this;
    let meta;
    let joinerName = document.getElementById("joinerNameA").value;

    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showAJoiner.call(joinerName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showJoiner ok");
      console.log(value);
      joiner = value;
      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("time:" + value[2]);
      console.log("project:" + value[3]);
      let detail = document.getElementById("divjoinerdetail");
      let ulitem = detail.childNodes[1];
      ulitem.childNodes[1].innerHTML = 'add:' + value[0];
      ulitem.childNodes[3].innerHTML = 'joiner名字:' + value[1];
      ulitem.childNodes[5].innerHTML = 'joiner公益时:' + value[2];
      ulitem.childNodes[7].innerHTML = 'joiner加入的项目' + value[3];
    }).then(function (e) {
      console.log(e);
    });

  },

  showAllJoiner: function () {
    const self = this;
    let meta;
    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showAllJoiners.call({
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showJoiner ok");
      console.log(value);
    }).then(function (e) {
      console.log(e);
    });
  },

  //create publisher 
  //@param name,TimeCount
  addNewPublisher: function () {
    const self = this;
    let publisherName = document.getElementById("publisherName").value;
    let publisherTimeCount = document.getElementById("publisherTimeCount").value;
    let meta;
    console.log("addNewPublisher button click!");
    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.addNewPublisher.sendTransaction(publisherName, publisherTimeCount, {
        from: accounts[2],
        gas: 3000000
      });
    }).then(function () {
      self.setStatus('addNewPublisher ok!');
      console.log('addNewPublisher ok!');
    }).catch(function (e) {
      console.log(e);
      self.setStatus('addNewPublisher error!');
    })
  },
  //show publisher
  showPublisher: function () {
    const self = this;
    let meta;
    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showPublisher.call({
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showPublisher ok");
      console.log(value);
      publisher = value;
      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("time:" + value[2]);
      console.log("project:" + value[3]);
      let detail = document.getElementById("divpublisherdetail");
      let ulitem = detail.childNodes[1];
      ulitem.childNodes[1].innerHTML = 'add:' + value[0];
      ulitem.childNodes[3].innerHTML = 'publisher名字:' + value[1];
      ulitem.childNodes[5].innerHTML = 'publisher公益时:' + value[2];
      ulitem.childNodes[7].innerHTML = 'publisher发布的项目' + value[3];
    }).then(function (e) {
      console.log(e);
    });

  },
  //show publisher by address
  showAPublisher: function () {
    const self = this;
    let meta;
    let publisherName = document.getElementById("publisherNameA").value;
    Plant.deployed().then(function (instance) {
      meta = instance; // get instance
      return meta.showAPublisher.call(publisherName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showPublisher ok");
      console.log(value);
      publisher = value;
      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("time:" + value[2]);
      console.log("project:" + value[3]);
      let detail = document.getElementById("divpublisherdetail");
      let ulitem = detail.childNodes[1];
      ulitem.childNodes[1].innerHTML = 'add:' + value[0];
      ulitem.childNodes[3].innerHTML = 'publisher名字:' + value[1];
      ulitem.childNodes[5].innerHTML = 'publisher公益时:' + value[2];
      ulitem.childNodes[7].innerHTML = 'publisher发布的项目' + value[3];
    }).then(function (e) {
      console.log(e);
    });

  },

  //create project
  //params: name,startTime,MaxJoinerCounter,TimeCount
  addNewProject: function () {
    const self = this;
    let meta;
    let projectName = document.getElementById("projectName").value;
    let projectTime = document.getElementById("projectTime").value;
    let projectMaxJoiner = document.getElementById("projectMaxJoiner").value;
    let projectMaxTime = document.getElementById("projectMaxTime").value;

    let publisherName = publisher[1];

    console.log(publisherName);

    Plant.deployed().then(function (instance) {
      meta = instance;
      console.log(projectName, projectTime, projectMaxJoiner, projectMaxTime);
      return meta.addNewProject.sendTransaction(projectName, projectTime, projectMaxJoiner, projectMaxTime, publisherName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function () {
      console.log("addNewProject ok");
    }).then(function (e) {
      console.log(e);
    });

  },
  showProject: function () {
    const self = this;
    let meta;

    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showProject.call({
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showProject ok");
      console.log(value);

      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("projectTime:" + value[2]);
      console.log("projectMaxCount:" + value[3]);
      console.log("projectMaxJobTime:" + value[4]);
      console.log("publisher:" + value[5]);
      console.log("joiners:" + value[6]);
      console.log("projectIsOpen:" + value[7]);
      let count = 0;
      if (value[6] == "") {
        count = 0;
      } else {
        count = value[6].split(",").length;
      }
      var div = document.createElement("div");
      div.id = "project_" + value[1];
      div.className = "projectitem";
      var listItem =
        '<ul>' +
        '<li id="project_address">' + value[0].substring(0, 8) + '</li>' +
        '<li id="project_name">' + '项目名: ' + value[1] + '</li>' +
        '<li id="project_nowcount">' + '项目人数: ' + count + '</li>' +
        '<li id = "project_maxcount">' + '项目最多人数: ' + value[3] + '</li>' +
        '<li id = "project_jobtime">' + '项目公益时: ' + value[4] + '</li>' +
        '<li id= "project_isEnd">' + '项目状态: ' + value[7] + '</li>' +
        '</ul>' +
        '<button id="addInProject" onclick="App.addInProject(this)">加入项目</button>';
      div.innerHTML = listItem;
      let lists = document.getElementById("div_projects");
      let listschild = lists.childNodes;
      for (let i = 0; i < listschild.length; i++) {
        if (listschild[i].id == "project_" + value[1]) {
          let ulitem = listschild[i].childNodes[0];
          ulitem.childNodes[0].innerHTML = value[0].substring(0, 8);
          ulitem.childNodes[1].innerHTML = '项目名: ' + value[1];
          ulitem.childNodes[2].innerHTML = '项目人数: ' + count;
          ulitem.childNodes[3].innerHTML = '项目最多人数: ' + value[3];
          ulitem.childNodes[4].innerHTML = '项目公益时: ' + value[4];
          ulitem.childNodes[5].innerHTML = '项目状态: ' + value[7];
          return;
        }
      }

      lists.appendChild(div);
    }).then(function (e) {
      console.log(e);
    });

  },

  showAProject: function () {
    const self = this;
    let meta;

    let projectName = document.getElementById("projectNameA").value;
    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.showAProject.call(projectName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      self.setStatus("showAProject ok");
      console.log(value);

      console.log("address:" + value[0]);
      console.log("name:" + value[1]);
      console.log("projectTime:" + value[2]);
      console.log("projectMaxCount:" + value[3]);
      console.log("projectMaxJobTime:" + value[4]);
      console.log("publisher:" + value[5]);
      console.log("joiners:" + value[6]);
      console.log("projectIsOpen:" + value[7]);
      let count = 0;
      if (value[6] == "") {
        count = 0;
      } else {
        count = value[6].split(",").length;
      }
      var div = document.createElement("div");
      div.id = "project_" + value[1];
      div.className = "projectitem";
      var listItem =
        '<ul>' +
        '<li id="project_address">' + value[0].substring(0, 8) + '</li>' +
        '<li id="project_name">' + '项目名: ' + value[1] + '</li>' +
        '<li id="project_nowcount">' + '项目人数: ' + count + '</li>' +
        '<li id = "project_maxcount">' + '项目最多人数: ' + value[3] + '</li>' +
        '<li id = "project_jobtime">' + '项目公益时: ' + value[4] + '</li>' +
        '<li id= "project_isEnd">' + '项目状态: ' + value[7] + '</li>' +
        '</ul>' +
        '<button id="addInProject" onclick="App.addInProject(this)">加入项目</button>';
      div.innerHTML = listItem;
      let lists = document.getElementById("div_projects");
      let listschild = lists.childNodes;

      for (let i = 0; i < listschild.length; i++) {
        if (listschild[i].id == "project_" + value[1]) {
          let ulitem = listschild[i].childNodes[0];
          ulitem.childNodes[0].innerHTML = value[0].substring(0, 8);
          ulitem.childNodes[1].innerHTML = '项目名: ' + value[1];
          ulitem.childNodes[2].innerHTML = '项目人数: ' + count;
          ulitem.childNodes[3].innerHTML = '项目最多人数: ' + value[3];
          ulitem.childNodes[4].innerHTML = '项目公益时: ' + value[4];
          ulitem.childNodes[5].innerHTML = '项目状态: ' + value[7];
          return;
        }
      }

      lists.appendChild(div);

    }).then(function (e) {
      console.log(e);
    });
  },
  finishProject: function () {
    let meta;
    let self = this;
    let projectName = document.getElementById("finishProjectName").value;

    Plant.deployed().then(function (instance) {
      meta = instance;
      return meta.finishProject.sendTransaction(projectName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      console.log(value);
    }).then(function (e) {
      console.log(e);
    });
  },
  addInProject: function (thisNode) {
    let meta;
    let self = this;

    var demoParent = thisNode.parentNode;
    var ul = demoParent.children[0];
    let tem = ul.children[1].innerHTML;
    let projectName = tem.substring(5);
    Plant.deployed().then(function (instance) {
      meta = instance;
      console.log(joiner[1]);
      console.log(projectName);
      return meta.addInProject.sendTransaction(joiner[1], projectName, {
        from: accounts[0],
        gas: 3000000
      });
    }).then(function (value) {
      console.log(value);
      self.setStatus(value);
    }).then(function (e) {
      console.log(e);

    });

  }

}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  App.start();
})