// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Kittycontract is IERC721, Ownable{
    using SafeMath for uint256;
    
    string public constant _name = "KittyCutie";
    string public constant _symbol = "KTCT";
    uint public constant Gen0_limit = 20;

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

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
    mapping(uint256 => address) public _kittyApprovals; //owner approve a specific address to transfer a specific kitty (token) 
    mapping(address => mapping(address => bool)) private _operatorApprovals; //owner approve a specific address to transfer all kities owned

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

    function getKitty(uint256 _id) public view returns (
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
    
    function balanceOf(address _owner) public view override returns (uint256) {
        require(_owner != address(0), "ERC721: balance query for the zero address");
        return _kittyBalance[_owner];
    }

    function totalSupply() public view override returns (uint256 total) {
        return kitties.length;
    }

    function name() public pure override returns (string memory) {
        return _name;
    }

    function symbol() public pure override returns (string memory) {
        return _symbol;
    }

    function ownerOf(uint256 _tokenId) public view override returns (address) {
        address owner = _kittyOwners[_tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function transfer(address _to, uint256 _tokenId) public override {
        require(address(this) != _to);
        require(address(0) != _to);
        require(_ownedBy(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external override {
        require(_ownedBy(msg.sender, _tokenId));
        require(_approved != msg.sender, "Address to approve is same as owner address");

        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external override{
        require(_operator != msg.sender);

        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) public view override returns (address){
        require(_exists(_tokenId), "ERC721: operator query for nonexistent token");
        return _kittyApprovals[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view override returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) public override {
        require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(_from, _to, _tokenId, _data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public override {
        safeTransferFrom(_from, _to, _tokenId);
    }

//re-usable functions
    function _ownedBy(address claimant, uint256 _tokenId) internal view returns(bool) {
        return _kittyOwners[_tokenId] == claimant;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        _kittyBalance[_to]++;
        _kittyOwners[_tokenId] = _to;
        
        if(_from != address(0)){
            _kittyBalance[_from]--;
            delete _kittyApprovals[_tokenId]; //remove approval when token is transferred to another owner
        }
        
        emit Transfer(_from, _to, _tokenId);
    }

    function _approve(address _to, uint256 _tokenId) internal { 
        _kittyApprovals[_tokenId] = _to;
    }

    function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns (bool) {
        require(_exists(_tokenId), "ERC721: operator query for nonexistent token");
        require(_ownedBy(_from, _tokenId), "ERC721: Sender does not own this token");
        require(_to != address(0));
        return (_spender == _from || getApproved(_tokenId) == _spender || isApprovedForAll(_from, _spender));
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        require(_tokenId < kitties.length);
        return _kittyOwners[_tokenId] != address(0);
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data) );
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns(bool) {
        //checks if receiver is a contract
        if(!_isContract(_to) ){
            return true;
        }
        //Call onERC721Received in the _to contract
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        //check return value
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) internal view returns (bool){
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }
}