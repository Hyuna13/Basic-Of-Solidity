// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.6.0 <0.9.0;

contract myGame{
    
    uint public playerCount = 0;
    mapping (address => Player) public players;

    enum Level {Novice, Intermediate, Advanced}
    
    struct Player {
        address playerAddress;
        Level playerLevel;
        string firstName;
        string lastName;
        uint createdTime;
    }

    function addPlayer(string memory firstName, string memory lastName) public {
        players[msg.sender] = Player(msg.sender, Level.Novice, firstName, lastName, block.timestamp);
        playerCount += 1;
    }

    function getPlayerLevel(address playerAddress) public view returns(Level){
        Player storage player = players[playAddress];
        return player.playerLevel;
    }

    function changePlayerLevel(address playAddress) public {
        Player storage player = players[playAddress];
        if(block.timestamp >= player.createdTime + 20){
            player.playerLevel = Level.Intermediate;
        }
    }
}
