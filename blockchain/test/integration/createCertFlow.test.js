
const Cert = artifacts.require("Cert");

const Nft = artifacts.require("NftIPFS");



contract("Cert", (accounts) => {
  let nftInstance;
  let certInstance;
  let msgSender = accounts[0];

  before(async () => {
    nftInstance = await Nft.deployed();
    certInstance = await Cert.deployed();
  })



  it('NftIPFS address should be the same in cert contract', async () => {
    const certNftAddress = await certInstance.nftContract();
    const nftAddress = nftInstance.address;

    console.log("Cert contract NFT address:", certNftAddress);
    console.log("Deployed NFT contract address:", nftAddress);
    assert.equal(certNftAddress, nftAddress, "NFT contract address in Cert contract does not match deployed NFT contract address");
  })

  it('should create a cert and a nft', async () => {

    const newCertTx = await certInstance.addCert(
      "issuerNameTest",
      "00/00/0000",
      "subjectTest",
      "courseTest",
      "imageHashTest",
      "metadataHashTest",
      { from: msgSender }
    );


    assert.ok(newCertTx, "Cert transaction was not successful");

    const metadataHash = newCertTx.logs[0].args._metadataHash;
    assert.equal(metadataHash, "metadataHashTest", "Metadata hash from event does not match");

    const retrievedCert = await certInstance.getCert(metadataHash);

    assert.equal(retrievedCert.credential.issuerName, "issuerNameTest", "Issuer name does not match");
    assert.equal(retrievedCert.date, "00/00/0000", "Date does not match");
    assert.equal(retrievedCert.subject, "subjectTest", "Subject does not match");
    assert.equal(retrievedCert.course, "courseTest", "Course does not match");
    assert.equal(retrievedCert.displayInfo.imageHash, "imageHashTest", "Image hash does not match");
    assert.equal(retrievedCert.displayInfo.metadataHash, "metadataHashTest", "Metadata hash does not match");

    const newNft = await nftInstance.tokenURI(retrievedCert.displayInfo.NFTid);

    assert.equal(newNft, "ipfs://metadataHashTest", "NFT url does not match");

    const nftOwner = await nftInstance.ownerOf(retrievedCert.displayInfo.NFTid);

    assert.equal(nftOwner, msgSender, "NFT owner does not match");

  })

})
