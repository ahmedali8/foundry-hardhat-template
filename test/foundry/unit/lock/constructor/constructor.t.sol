// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Lock, Errors } from "contracts/Lock.sol";

import { Lock_Test } from "../Lock.t.sol";

contract Lock_Constructor is Lock_Test {
    /// @dev it should revert.
    function test_RevertWhen_UnlockTimeNotInFuture() external {
        vm.expectRevert(Errors.Lock_UnlockTimeShouldBeInTheFuture.selector);
        new Lock(block.timestamp);
    }

    modifier UnlockTimeInFuture() {
        _;
    }

    function test_RetrieveCorrectLockedAmount() external UnlockTimeInFuture {
        uint256 actualBalance = address(lock).balance;
        uint256 expectedBalance = lockedAmount;

        assertEq(actualBalance, expectedBalance);
    }
}
