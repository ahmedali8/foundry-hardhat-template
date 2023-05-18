// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { LockTest } from "../LockTest.t.sol";

contract Lock_Owner is LockTest {
    /// @dev it should retrieve correct owner
    function test_Owner() external {
        address actualOwner = lock.owner();
        address expectedOwner = deployer;

        assertEq(actualOwner, expectedOwner);
    }
}
