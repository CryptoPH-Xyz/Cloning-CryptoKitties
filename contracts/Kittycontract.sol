// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Kittycontract is IERC721{
    using SafeMath for uint256;
    
    string public constant _name = "KittyCutie";
    string public constant _symbol = "KTCT";
    
    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;

    mapping(address => uint256) public _kittyBalance;
    mapping(uint256 => address) _kittyOwners;
    
    function balanceOf(address owner) external view override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _kittyBalance[owner];
    }

    function totalSupply() external view override returns (uint256 total) {
        return kitties.length;
    }

    function name() external pure override returns (string memory) {
        return _name;
    }

    function symbol() external pure override returns (string memory) {
        return _symbol;
    }

    function ownerOf(uint256 tokenId) external view override returns (address) {
        address owner = _kittyOwners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }


    function ownedBy(address claimant, uint256 tokenId) internal view returns(bool) {
        return _kittyOwners[tokenId] == claimant;
    }

    function transfer(address to, uint256 tokenId) external override {
        require(address(this) != to);
        require(address(0) != to);
        require(ownedBy(msg.sender, tokenId));

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        if(from != address(0)){
            _kittyBalance[from]--;
        }
        _kittyBalance[to]++;
        _kittyOwners[tokenId] = to;
        
        emit Transfer(from, to, tokenId);
    }
}