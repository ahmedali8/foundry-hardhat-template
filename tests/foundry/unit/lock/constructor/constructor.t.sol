// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Lock, Errors } from "contracts/Lock.sol";

import { Lock_Test } from "../Lock.t.sol";

/// @title Lock Constructor Tests
/// @author @0xdev8
/// @notice Tests for the Lock contract constructor functionality
contract Lock_Constructor is Lock_Test {
    /// @notice Test that constructor reverts when unlock time is not in the future
    function test_RevertWhen_UnlockTimeNotInFuture() external {
        vm.expectRevert(Errors.Lock_UnlockTimeShouldBeInTheFuture.selector);
        new Lock(block.timestamp);
    }

    modifier UnlockTimeInFuture() {
        _;
    }

    /// @notice Test that the correct amount is locked in the contract
    function test_RetrieveCorrectLockedAmount() external view UnlockTimeInFuture {
        uint256 actualBalance = address(lock).balance;
        uint256 expectedBalance = lockedAmount;

        assertEq(actualBalance, expectedBalance);
    }
}
