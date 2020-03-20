const Ethbay = artifacts.require("Ethbay");
const MovieReview = artifacts.require("MovieReview");

module.exports = function(deployer) {
  deployer.deploy(Ethbay);
  deployer.deploy(MovieReview);
};
