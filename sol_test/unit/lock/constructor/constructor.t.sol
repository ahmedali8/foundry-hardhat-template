// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { LockTest } from "../LockTest.t.sol";
import { Lock } from "contracts/Lock.sol";

contract Lock_Constructor is LockTest {
    /// @dev it should revert.
    function test_RevertWhen_UnlockTimeNotInFuture() external {
        vm.expectRevert(LockError_UnlockTimeShouldBeInTheFuture);
        new Lock(block.timestamp);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_UnlockTimeNotInFuture(uint256 blockTimestamp) external {
        vm.assume(blockTimestamp < block.timestamp);
        vm.expectRevert(LockError_UnlockTimeShouldBeInTheFuture);
        new Lock(blockTimestamp);
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
