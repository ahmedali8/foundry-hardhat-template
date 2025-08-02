// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import { Errors } from "./Errors.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

/// @title Lock Contract
/// @author @0xdev8
/// @notice A time-locked contract that allows the owner to withdraw funds after a specified unlock
/// time
contract Lock {
    /// @notice The timestamp when funds can be withdrawn
    uint256 public unlockTime;
    /// @notice The address of the contract owner who can withdraw funds
    address payable public owner;

    /// @notice Emitted when funds are withdrawn from the contract
    /// @param amount The amount of ETH withdrawn
    /// @param when The timestamp when the withdrawal occurred
    event Withdrawal(uint256 indexed amount, uint256 indexed when);

    /// @notice Constructor that sets the unlock time and owner
    /// @param _unlockTime The timestamp when funds can be withdrawn (must be in the future)
    constructor(uint256 _unlockTime) payable {
        // solhint-disable-next-line
        if (block.timestamp >= _unlockTime) revert Errors.Lock_UnlockTimeShouldBeInTheFuture();

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /// @notice Allows the owner to withdraw all funds after the unlock time has passed
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
