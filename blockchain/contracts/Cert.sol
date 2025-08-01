// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Nft.sol";

contract Cert {
  
    struct cert {
        string[] context;
        uint256 id;
        string[] certType;
        string issuer;
        string issuernceDate;
        cretencials credentialSubject;
        display displayInfo;
    }
    struct cretencials {
        string id;
        string mane;
        string email;
        address publicKey;
    }

    struct display {
        string contentType;
        string content;
    }
  
    mapping (uint256 => cert) public certs;

    uint certCount;
    Nft public nftContract;

    constructor (address nftAddress) {
        certCount = 0;
        nftContract = Nft(nftAddress);
    }

    function addCert() payable external returns (cert memory) {
        
        cert storage newCert = certs[certCount];

        newCert.id = certCount;
        newCert.context.push("https://www.w3.org/2018/credentials/v1");
        newCert.certType.push("teste");
        newCert.issuer = "Issuer Teste";
        newCert.issuernceDate = "2023-10-01";
        newCert.credentialSubject.id = "subject1";
        newCert.credentialSubject.mane = "Subject Name";
        newCert.credentialSubject.email = "test@test";
        newCert.credentialSubject.publicKey = address(msg.sender);
        newCert.displayInfo.contentType = "application/json";
        newCert.displayInfo.content = "{msg: teste}";

        nftContract.mintCertificado(msg.sender, newCert.id);

        certCount++;
        return newCert;
    }
    function getCert(uint id) view external returns(cert memory) {
        require(id < certCount, "Id nao valido");
        return certs[id];
    }
}

