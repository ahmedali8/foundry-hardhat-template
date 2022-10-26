// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import { LockTest } from "../LockTest.t.sol";

contract Lock__UnlockTime is LockTest {
    /// @dev it should retrieve correct unlockTime
    function testUnlockTime() external {
        uint256 actualUnlockTime = lock.unlockTime();
        uint256 expectedUnlockTime = unlockTime;

        assertEq(actualUnlockTime, expectedUnlockTime);
    }
}
