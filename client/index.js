var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x61b369574c6249C14983cd44e14EfE5137EAe1ba"; //enter contact address here

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]}); //await Kittycontract.deployed() in truffle
        user = accounts[0];

        console.log(instance);
    })
})