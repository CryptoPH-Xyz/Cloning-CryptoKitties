// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Kittycontract is IERC721, Ownable{
    using SafeMath for uint256;
    
    string public constant _name = "KittyCutie";
    string public constant _symbol = "KTCT";
    uint public constant Gen0_limit = 20;

    event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);
    
    
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

    uint256 public Gen0_Kitties_created;

    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint256) {
        require(Gen0_Kitties_created < Gen0_limit);
        Gen0_Kitties_created ++;

        return _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function _createKitty(uint256 _mumId, uint256 _dadId, uint256 _generation, uint256 _genes, address _owner) private returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        kitties.push(_kitty);
        uint256 newKittenId = kitties.length - 1;

        emit Birth(_owner, newKittenId, _mumId, _dadId, _genes);
        _transfer(address(0), _owner, newKittenId); //transfer from nowhere(address(0)) means Creation of a Kitty

        return newKittenId;
    }

    event Breed(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes, uint256 generation);

    function getKitty(uint256 _id) external view returns (
        uint256 _genes,
        uint256 _birthTime,
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation
    ) 
    {
        Kitty storage kitty = kitties[_id];

        _genes = kitty.genes;
        _birthTime = uint256(kitty.birthTime);
        _mumId = uint256(kitty.mumId);
        _dadId = uint256(kitty.dadId);
        _generation = uint256(kitty.generation);       
    }
    
    function balanceOf(address _owner) external view override returns (uint256) {
        require(_owner != address(0), "ERC721: balance query for the zero address");
        return _kittyBalance[_owner];
    }

    function totalSupply() public view override returns (uint256 total) {
        return kitties.length;
    }

    function name() external pure override returns (string memory) {
        return _name;
    }

    function symbol() external pure override returns (string memory) {
        return _symbol;
    }

    function ownerOf(uint256 _tokenId) external view override returns (address) {
        address owner = _kittyOwners[_tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function transfer(address _to, uint256 _tokenId) external override {
        require(address(this) != _to);
        require(address(0) != _to);
        require(_ownedBy(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

//re-usable function
    function _ownedBy(address claimant, uint256 _tokenId) internal view returns(bool) {
        return _kittyOwners[_tokenId] == claimant;
    }

//re-usable function
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        _kittyBalance[_to]++;
        _kittyOwners[_tokenId] = _to;
        
        if(_from != address(0)){
            _kittyBalance[_from]--;
        }
        
        emit Transfer(_from, _to, _tokenId);
    }
}