// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Lock_Test } from "../Lock.t.sol";

contract Lock_UnlockTime is Lock_Test {
    /// @dev it should retrieve correct unlockTime
    function test_UnlockTime() external {
        uint256 actualUnlockTime = lock.unlockTime();
        uint256 expectedUnlockTime = unlockTime;

        assertEq(actualUnlockTime, expectedUnlockTime);
    }
}
