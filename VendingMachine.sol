//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract VendingMachine {
    //State variables
    address public owner; 
    mapping(address => uint) public donutBalances;
    

    constructor(){
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    //Functions
    function getVendingMachineBalance() public view returns(uint){
        return donutBalances[address(this)];
    }

    function restock(uint amount) public {
        require(msg.sender == owner, "Only owner can restock this machine");

        donutBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 2 ether, "You must pay at least 2 ether per donut");
        require(donutBalances[address(this)] >= amount, "Not enough donut in stock to fulfil purchase request");

        donutBalances[address(this)] -= amount;
        donutBalances[msg.sender] += amount;
    }

    function burn(uint amount) public {
        require(msg.sender == owner, "Only owner can burn donuts");
        require(amount <= donutBalances[address(this)], "There's no more donuts in vending machine");
        
        donutBalances[address(this)] -= amount;
    }

    
}
