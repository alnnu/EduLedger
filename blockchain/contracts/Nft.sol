pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";   

contract Nft is ERC721 {
    uint256 public nextTokenId;

    mapping(uint256 => uint256) public certificadoMetadata;
    constructor() ERC721("Diplomas", "BCC") {
    }

    function mintCertificado(address to, uint256 metadata) external  {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        certificadoMetadata[tokenId] = metadata;
    }
}

