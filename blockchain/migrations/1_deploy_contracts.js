const Cert = artifacts.require("Cert");
const Nft = artifacts.require("Nft");

module.exports = async function (deployer) {
  await deployer.deploy(Nft);
  const nftInstance = await Nft.deployed();
  await deployer.deploy(Cert, nftInstance.address);
};
