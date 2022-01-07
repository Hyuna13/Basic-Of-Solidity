// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.6.0 <0.9.0;

contract PredictionMarket {
    enum Side { Lee, Yoon }
    struct Result {
      Side winner;
      Side loser;
    }
    Result public result;
    bool public electionFinished;

    mapping(Side => uint) public bets;
    mapping(address => mapping(Side => uint)) public betsPerGambler;
    address public oracle;
    
    constructor(address _oracle) {
        oracle = _oracle;
    } 

    function placeBet(Side _side) external payable {
        require(electionFinished == false, "Election is finished");
        bets[_side] += msg.value;
        betsPerGambler[msg.sender][_side] += msg.value; 
    }

    function withdrawGain() external {
        uint gamblerBet = betsPerGambler[msg.sender][result.winner];
        require(gamblerBet > 0, "You do not have any winning bet");
        require(electionFinished == true, "Election is not finished");
        uint gain = gamblerBet + bets[result.loser] * gamblerBet / bets[result.winner];
        betsPerGambler[msg.sender][Side.Lee] = 0;
        betsPerGambler[msg.sender][Side.Yoon] = 0;
        payable(msg.sender).transfer(gain);
    }

    function reportResult(Side _winner, Side _loser) external {
        require(oracle == msg.sender, "only oracle");
        require(electionFinished == false, "Election is finished");
        result.winner = _winner;
        result.loser = _loser;
        electionFinished = true;
    }
}
