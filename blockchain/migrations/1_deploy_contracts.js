const Cert = artifacts.require("Cert");
const Nft = artifacts.require("NftIPFS");

module.exports = async function(deployer, network, accounts) {


  const accountDeployer = accounts[0];

  console.log(`Iniciando deploy na rede: ${network}`);
  console.log(`Conta responsável pelo deploy: ${accountDeployer}`);


  try {

    if (network === 'main') {
      console.log('>> Unlocking account ' + accountDeployer);
    }

    await deployer.deploy(Nft);
    const nftInstance = await Nft.deployed();


    await deployer.deploy(Cert, nftInstance.address);
    const certInstance = await Cert.deployed();

    console.log("----------------------------------------------------");
    console.log(` MeuContrato deployed com sucesso!`);
    console.log(` Endereço do Cert: ${certInstance.address}`);
    console.log(` Endereço do Nft: ${nftInstance.address}`);
    console.log(` Rede: ${network}`);
    console.log("----------------------------------------------------");


  } catch (error) {
    console.error("❌ Falha no deploy:");
    console.error(error);
  }

};
