// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

library Errors {
    error Lock_CallerNotOwner();
    error Lock_CannotWithdrawYet();
    error Lock_UnlockTimeShouldBeInTheFuture();
}

contract Lock {
    uint256 public unlockTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        if (block.timestamp >= _unlockTime) revert Errors.Lock_UnlockTimeShouldBeInTheFuture();

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your
        // terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        if (block.timestamp < unlockTime) revert Errors.Lock_CannotWithdrawYet();
        if (msg.sender != owner) revert Errors.Lock_CallerNotOwner();

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
