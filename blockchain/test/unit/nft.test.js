const NFT = artifacts.require("NftIPFS");

contract("NFT Contract", (accounts) => {
  let NFTInstance;

  before(async () => {
    NFTInstance = await NFT.deployed();
  })

  it('should mint a new NFT', async () => {
    const metaDataHash = "metadataHashTest";
    const mintTx = await NFTInstance.mintCertificado(accounts[0], metaDataHash);

    assert.ok(mintTx, "Mint transaction was not successful");

    const tokenId = mintTx.logs[0].args.tokenId;
    const retrievedTokenURI = await NFTInstance.tokenURI(tokenId);

    assert.equal(retrievedTokenURI, "ipfs://metadataHashTest", "Token URI does not match");
  })
})
