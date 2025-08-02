// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Lock_Test } from "../Lock.t.sol";

/// @title Lock Owner Tests
/// @author @0xdev8
/// @notice Tests for the Lock contract owner functionality
contract Lock_Owner is Lock_Test {
    /// @notice Test that the correct owner is retrieved from the lock contract
    function test_Owner() external view {
        address actualOwner = lock.owner();
        address expectedOwner = users.deployer;

        assertEq(actualOwner, expectedOwner);
    }
}
