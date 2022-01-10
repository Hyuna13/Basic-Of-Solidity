// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {

    string public message;
    address public owner;

    constructor(string memory _message) {
        message = _message;
        owner = msg.sender;
    }

    function hello() public view returns(string memory) {
      return message;
    }
    function setMessage(string memory _message) public payable {
      require(msg.sender == owner);
      message = _message;
    }
}