
const Cert = artifacts.require("Cert");

const Nft = artifacts.require("NftIPFS");



contract("Cert", () => {
  let nftInstance;
  let certInstance;

  before(async () => {
    nftInstance = await Nft.deployed();
    certInstance = await Cert.deployed();
  })


  it('should revert when getting a inexistent non-existent cert ', async () => {


    try {

      await certInstance.getCert("non-existent");
      assert.fail("Transaction should have reverted");

    } catch (error) {

      assert(error.message.includes("revert"), "certiicado nao encontrado");

    }

  })

  it('should not create a cert with a invalid account', async () => {

    try {

      await certInstance.addCert(
        "issuerNameTest",
        "00/00/0000",
        "subjectTest",
        "courseTest",
        "imageHashTest",
        "metadataHashTest",
        {
          from: "0x5555555555555555555555555555"
        }
      );


    } catch (error) {

      assert(error.message.includes("Provided"), "address is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted.");

    }
  })
})
