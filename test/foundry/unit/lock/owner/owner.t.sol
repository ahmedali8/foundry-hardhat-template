// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Lock_Test } from "../Lock.t.sol";

contract Lock_Owner is Lock_Test {
    /// @dev it should retrieve correct owner
    function test_Owner() external {
        address actualOwner = lock.owner();
        address expectedOwner = users.deployer;

        assertEq(actualOwner, expectedOwner);
    }
}
