// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NftIPFS.sol";

contract Cert {
  
    struct cert {
        string subject;
        string course;
        string date;
        cretencials credential;
        display displayInfo;
    }
    struct cretencials {
        string issuerName;
        address publicKey;
    }

    struct display {
        string imageHash;
        string metadataHash;
    }
  
    mapping (uint => cert) public certs;

    uint certCount;

    NftIPFS public nftContract;

    constructor (address nftAddress) {
        certCount = 0;
        nftContract = NftIPFS(nftAddress);
    }

    function addCert(string memory _issuerName, string memory _date, string memory _subject, string memory _course, string memory _imageHash, string memory _metadataHash) payable external returns (cert memory) {
        

        cert storage newCert = certs[certCount];

        newCert.date = _date;
        newCert.subject = _subject;
        newCert.course = _course;
        newCert.credential.issuerName = _issuerName;
        newCert.credential.publicKey = address(msg.sender);
        newCert.displayInfo.imageHash = _imageHash;
        newCert.displayInfo.metadataHash = _metadataHash;

        nftContract.mintCertificado(msg.sender ,_metadataHash);

        certCount++;
        return newCert;
    }
    function getCert(string memory _metadataHash) view external returns(cert memory) {
        for (uint i = 0; i < certCount; i++) {
          if(compareStrings(certs[i].displayInfo.metadataHash, _metadataHash)) {
            return certs[i];
          }
        }
        revert("certiicado nao encontrado");
    }

    function getAllCerts() view external returns(cert[] memory) {
        cert[] memory allCerts = new cert[](certCount);

        for (uint i = 0; i < certCount; i++) {
            allCerts[i] = certs[i];
        }

        return allCerts;
    }

  function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
    
}

// problemas: não vejo como comparar se o cert ja existe, e possivel problema de performace( passando de O(1) para O(n) em getCert)
