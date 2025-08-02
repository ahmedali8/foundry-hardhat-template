// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Lock_Test } from "../Lock.t.sol";

/// @title Lock Unlock Time Tests
/// @author @0xdev8
/// @notice Tests for the Lock contract unlock time functionality
contract Lock_UnlockTime is Lock_Test {
    /// @notice Test that the correct unlock time is retrieved from the lock contract
    function test_UnlockTime() external view {
        uint256 actualUnlockTime = lock.unlockTime();
        uint256 expectedUnlockTime = unlockTime;

        assertEq(actualUnlockTime, expectedUnlockTime);
    }
}
