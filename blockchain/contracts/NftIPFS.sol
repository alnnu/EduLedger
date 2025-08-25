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
    _setTokenURI(tokenId, "ipfs://bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg");
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

}
