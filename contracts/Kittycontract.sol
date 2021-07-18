// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Kittycontract is IERC721, Ownable {
    using SafeMath for uint256;

    string public constant _name = "KittyCutie";
    string public constant _symbol = "KTCT";
    uint256 public constant Gen0_limit = 20;

    bytes4 internal constant MAGIC_ERC721_RECEIVED =
        bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    //interfaces supported
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    event Birth(
        address owner,
        uint256 kittenId,
        uint256 mumId,
        uint256 dadId,
        uint256 genes
    );

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

    function createKittyGen0(uint256 _genes)
        public
        onlyOwner
        returns (uint256)
    {
        require(Gen0_Kitties_created < Gen0_limit);
        Gen0_Kitties_created++;

        return _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
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

    function getKittyByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](_kittyBalance[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < kitties.length; i++) {
            if (_kittyOwners[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getKitty(uint256 _id)
        public
        view
        returns (
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

    function breedKitty(uint256 _dadId, uint256 _mumId)
        public
        returns (uint256)
    {
        //Check ownership
        require(
            msg.sender != address(0),
            "ERC721: balance query for the zero address"
        );
        require(_ownedBy(msg.sender, _dadId), "ERC721: breeder is not owner");
        require(_ownedBy(msg.sender, _mumId), "ERC721: breeder is not owner");

        //DNA is here
        uint256 kittyDna = _mixDna(
            kitties[_dadId].genes,
            kitties[_mumId].genes
        );

        //Figure out the generation
        uint16 dadGen = kitties[_dadId].generation;
        uint16 mumGen = kitties[_mumId].generation;
        uint16 kittyGen = 0;

        if ((dadGen + mumGen) > 0) {
            kittyGen = (dadGen + mumGen) / 2 + 1;
        } else {
            kittyGen = 1;
        }

        //Create a new kitty with the new properties, give it to msg.sender
        return _createKitty(_mumId, _dadId, kittyGen, kittyDna, msg.sender);
    }

    function balanceOf(address _owner)
        external
        view
        override
        returns (uint256)
    {
        require(
            _owner != address(0),
            "ERC721: balance query for the zero address"
        );
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

    function ownerOf(uint256 _tokenId)
        external
        view
        override
        returns (address)
    {
        address owner = _kittyOwners[_tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    function transfer(address _to, uint256 _tokenId) external override {
        require(address(this) != _to);
        require(address(0) != _to);
        require(_ownedBy(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) external override {
        require(_ownedBy(msg.sender, _tokenId));
        require(
            _to != msg.sender,
            "Address to approve is same as owner address"
        );

        _approve(_to, _tokenId);
        emit Approval(msg.sender, _to, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved)
        external
        override
    {
        require(_operator != msg.sender);

        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        require(
            _exists(_tokenId),
            "ERC721: operator query for nonexistent token"
        ); //added
        require(_tokenId < kitties.length);
        return _kittyApprovals[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool)
    {
        return _operatorApprovals[_owner][_operator];
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(
            _isApprovedOrOwner(msg.sender, _from, _to, _tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        safeTransferFrom(_from, _to, _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    ) public override {
        require(
            _isApprovedOrOwner(msg.sender, _from, _to, _tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(_from, _to, _tokenId, _data);
    }

    function supportsInterface(bytes4 _interfaceId)
        external
        pure
        returns (bool)
    {
        return (_interfaceId == _INTERFACE_ID_ERC721 ||
            _interfaceId == _INTERFACE_ID_ERC165);
    }

    //re-usable functions
    function _ownedBy(address claimant, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return _kittyOwners[_tokenId] == claimant;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        _kittyBalance[_to]++;
        _kittyOwners[_tokenId] = _to;

        if (_from != address(0)) {
            _kittyBalance[_from]--;
            delete _kittyApprovals[_tokenId]; //remove approval when token is transferred to another owner
        }

        emit Transfer(_from, _to, _tokenId);
    }

    function _approve(address _to, uint256 _tokenId) internal {
        _kittyApprovals[_tokenId] = _to;
    }

    function _isApprovedOrOwner(
        address _spender,
        address _from,
        address _to,
        uint256 _tokenId
    ) internal view returns (bool) {
        require(
            _exists(_tokenId),
            "ERC721: operator query for nonexistent token"
        );
        require(
            _ownedBy(_from, _tokenId),
            "ERC721: Sender does not own this token"
        );
        require(_to != address(0));
        return (_spender == _from ||
            getApproved(_tokenId) == _spender ||
            isApprovedForAll(_from, _spender));
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return _kittyOwners[_tokenId] != address(0);
    }

    function _safeTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function _checkERC721Support(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) internal returns (bool) {
        //checks if receiver is a contract
        if (!_isContract(_to)) {
            return true;
        }
        //Call onERC721Received in the _to contract
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(
            msg.sender,
            _from,
            _tokenId,
            _data
        );
        //check return value
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _mixDna(uint256 _dadDna, uint256 _mumDna)
        internal
        view
        returns (uint256)
    {
        uint256[8] memory geneArray;

        //pseudo-random: Not used for betting and monetary stuff
        //binary 8bit between 00000000 to 11111111
        uint8 random = uint8(
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % 255
        );

        //1, 2, 4, 8, 16, 32, 64, 128, loop through 8 times
        //values of the 8 numbers above in binary
        //00000001, 00000010, 00000100, 00001000,
        //00010000, 00100000, 01000000, 10000000
        //bitwise operator &
        uint256 i = 1;
        uint256 index = 7;
        for (i = 1; i <= 128; i *= 2) {
            if (random & i != 0) {
                geneArray[index] = uint8(_mumDna % 100); //last pair
            } else {
                geneArray[index] = uint8(_dadDna % 100);
            }
            //now remove last pair from dna
            _mumDna /= 100;
            _dadDna /= 100;

            //reduce index to set position to previous (e.g. from 7 to 6)
            index--;
        }

        //create DNA into a full number
        uint256 newGene;
        for (i = 0; i < 8; i++) {
            newGene += geneArray[i]; //add first pair to mewGene
            if (i != 7) {
                //to not add 2 zeroes after the last pair
                newGene *= 100; //adds two zeroes (00), at the end of each pair
            }
        }
        return newGene;
    }
}
