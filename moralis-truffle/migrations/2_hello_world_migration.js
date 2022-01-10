const HelloWorld = artifacts.require("HelloWorld");
const HelloWorldPermanent = artifacts.require("HelloWorldPermanent");

module.exports = function (deployer) {
  deployer.deploy(HelloWorld, "Hello world constructor");
};
