const Kittycontract = artifacts.require("Kittycontract");
const Marketplace = artifacts.require("Marketplace");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, Kittycontract.address);
};

/* 
To Add:
Deploy contract with 10 Gen0 kitties already for sale (max Gen0 is 20)
*/