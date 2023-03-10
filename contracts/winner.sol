// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract WinnerContract{
    address public owner;

    event Winner(address);

    constructor(){
        owner = msg.sender;
    }

    function attempt() external {
        require(msg.sender != owner, "The contract creator called the function");
        emit Winner(msg.sender);
    }
}