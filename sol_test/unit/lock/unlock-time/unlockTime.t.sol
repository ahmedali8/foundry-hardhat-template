// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { LockTest } from "../LockTest.t.sol";

contract Lock_UnlockTime is LockTest {
    /// @dev it should retrieve correct unlockTime
    function test_UnlockTime() external {
        uint256 actualUnlockTime = lock.unlockTime();
        uint256 expectedUnlockTime = unlockTime;

        assertEq(actualUnlockTime, expectedUnlockTime);
    }
}
