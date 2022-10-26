// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import { LockTest } from "../LockTest.t.sol";

contract Lock__Owner is LockTest {
    /// @dev it should retrieve correct owner
    function testOwner() external {
        address actualOwner = lock.owner();
        address expectedOwner = deployer;

        assertEq(actualOwner, expectedOwner);
    }
}
