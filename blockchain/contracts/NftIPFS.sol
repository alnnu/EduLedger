// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NftIPFS is ERC721, ERC721URIStorage {
 
  uint256 private nextTokenId;

  constructor() ERC721("Diplomas", "BCC") {}

  function mintCertificado(address to) external  {
    uint256 tokenId = nextTokenId++;
    _mint(to, tokenId);
    _setTokenURI(tokenId, "ipfs://Qmb7weuXsPz7DtKirUNQf3o28qHxbz3J7U3FCUtZFPaddU");
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

}
