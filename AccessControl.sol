//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract RealEstateAgreement {
    uint public price;
    bool public sellerPaysClosingFees;
    address private owner;

    constructor(uint256 _price) {
        owner = msg.sender;
        price = _price;
        sellerPaysClosingFees = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setClosingFeeAgreement(bool _ownerPays) public onlyOwner {
        sellerPaysClosingFees = _ownerPays;
    }
}
