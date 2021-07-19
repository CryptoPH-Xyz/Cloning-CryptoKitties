// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./KittyContract.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./IKittyMarketplace.sol";

contract Marketplace is Ownable, IKittyMarketPlace {
    Kittycontract private _kittyContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;
    mapping(uint256 => Offer) kittyForSale;

    function setKittyContract(address _kittyContractAddress)
        external
        override
        onlyOwner
    {
        _kittyContract = Kittycontract(_kittyContractAddress);
    }

    function getOffer(uint256 _tokenId)
        external
        view
        override
        returns (
            address seller,
            uint256 price,
            uint256 index,
            uint256 tokenId,
            bool active
        )
    {
        require(
            kittyForSale[_tokenId].active == true,
            "Kitty is not for Sale!"
        );
        seller = kittyForSale[_tokenId].seller;
        price = kittyForSale[_tokenId].price;
        index = kittyForSale[_tokenId].index;
        tokenId = kittyForSale[_tokenId].tokenId;
        active = kittyForSale[_tokenId].active;
    }

    function getAllTokenOnSale()
        external
        view
        override
        returns (uint256[] memory listOfOffers)
    {
        uint256 i;
        for (i = 0; i < offers.length; i++) {
            if (kittyForSale[i].active == true) {
                listOfOffers[i] += kittyForSale[i].tokenId;
            }
        }
        return listOfOffers;
    }

    function createOffer(uint256 _price, uint256 _tokenId) external override {
        require(
            msg.sender == _kittyContract.ownerOf(_tokenId),
            "You do not own this Kitty"
        );
        require(
            kittyForSale[_tokenId].active == false,
            "Cannot offer same Kitty twice"
        );
        require(
            address(this) == _kittyContract.getApproved(_tokenId),
            "This contract is not an approved operator"
        );
        _createOffer(msg.sender, _price, _tokenId);
    }

    function removeOffer(uint256 _tokenId) external override {
        require(
            msg.sender == offers[_tokenId].seller,
            "Only seller can remove offer"
        );
        require(kittyForSale[_tokenId].active == true, "Offer not found");
        _removeOffer(msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) external payable override {
        require(
            msg.sender != kittyForSale[_tokenId].seller,
            "You own this Kitty"
        );
        require(kittyForSale[_tokenId].active == true, "Kitty has no offers");
        require(
            msg.value == kittyForSale[_tokenId].price,
            "Insufficient amount"
        );
        _kittyContract.safeTransferFrom(
            kittyForSale[_tokenId].seller,
            msg.sender,
            _tokenId,
            ""
        );
        _removeOffer(kittyForSale[_tokenId].seller, _tokenId);
        emit MarketTransaction("Buy", kittyForSale[_tokenId].seller, _tokenId);
    }

    function _createOffer(
        address _seller,
        uint256 _price,
        uint256 _tokenId
    ) internal {
        //based from _createKitty in KittyContract.sol
        //index is offers.length because _offer is not yet added in the array
        Offer memory _offer = Offer({
            seller: payable(_seller),
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });
        offers.push(_offer);
        kittyForSale[_tokenId] = _offer;
        emit MarketTransaction("Create offer", _seller, _tokenId);
    }

    function _removeOffer(address _seller, uint256 _tokenId) internal {
        uint256 offerToRemove = kittyForSale[_tokenId].index;

        if (offers.length - 1 > 0) {
            offers[offerToRemove] = offers[offers.length - 1];
            offers[offerToRemove].index = offerToRemove;
            kittyForSale[offers[offerToRemove].index] = offers[offerToRemove];
        }
        offers.pop();
        delete kittyForSale[_tokenId];
        emit MarketTransaction("Remove offer", _seller, _tokenId);
    }
}
