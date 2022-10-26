// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import { LockTest } from "../LockTest.t.sol";
import { Lock } from "contracts/Lock.sol";

contract Lock__Constructor is LockTest {
    /// @dev it should revert.
    function testCannotDeploy__UnlockTimeNotInFuture() external {
        vm.expectRevert(LockError__UnlockTimeShouldBeInTheFuture);
        new Lock(block.timestamp);
    }

    modifier UnlockTimeInFuture() {
        _;
    }

    function testDeploy__LockedAmount() external UnlockTimeInFuture {
        uint256 actualBalance = address(lock).balance;
        uint256 expectedBalance = lockedAmount;

        assertEq(actualBalance, expectedBalance);
    }
}
