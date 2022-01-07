const PredictionMarket = artifacts.require('PredictionMarket.sol');

const SIDE = {
  LEE: 0,
  YOON: 1
};

module.exports = async function(deployer, _network, _addresses) {
    const [admin, oracle, gambler1, gambler2, gambler3, gambler4, _] = _addresses; 
    await deployer.deploy(PredictionMarket, oracle);
    const predictionMarket = await PredictionMarket.deployed();
    await predictionMarket.placeBet(
      SIDE.LEE,
      {from: gambler1, value: web3.utils.toWei('1')}
    );
    await predictionMarket.placeBet(
      SIDE.LEE,
      {from: gambler2, value: web3.utils.toWei('1')}
    );
    await predictionMarket.placeBet(
      SIDE.LEE,
      {from: gambler3, value: web3.utils.toWei('2')}
    );
    await predictionMarket.placeBet(
      SIDE.YOON,
      {from: gambler4, value: web3.utils.toWei('4')}
    );
}
