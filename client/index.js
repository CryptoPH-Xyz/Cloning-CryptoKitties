var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x9C06fA8d1cA9C3652b14E3A3e0f86B5921e3fB1C"; //enter contact address here

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]}); //await Kittycontract.deployed() in truffle
        user = accounts[0];

        console.log(instance);
        
        instance.events.Birth().on('connected', function(subscriptionId) {
            console.log(subscriptionId);
        }) 
        .on('error', function(error){
            console.log(error);
            alert("Kitty Birth failed");
        })
        .on('data', function(event) {
            alert(`Kitty birth successful! \n
            Kitty Owner: ${event.returnValues.owner}\n
            Kitty ID: ${event.returnValues.kittenId}\n
            Mommy Cat: ${event.returnValues.mumId}\n
            Daddy Cat: ${event.returnValues.dadId}\n
            Kitty Genes: ${event.returnValues.genes}
            `)
        })
    })
})

function createKitty() {
    var kittyDna = getDna();
    instance.methods.createKittyGen0(kittyDna).send({}, function(error, txHash) {
        if(error) 
            console.log(err);
        else 
            console.log(txHash); 
    })
}

$('#create').click(() => {
    createKitty(getDna());
})



