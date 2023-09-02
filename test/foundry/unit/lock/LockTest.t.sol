// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { Errors } from "../../shared/Errors.t.sol";
import { BaseTest } from "../BaseTest.t.sol";
import { Lock } from "contracts/Lock.sol";

/// @title LockTest
/// @author Ahmed Ali
/// @notice Common contract members needed across Lock test contracts.
abstract contract LockTest is BaseTest, Errors {
    /// EVENTS ///
    event Withdrawal(uint256 amount, uint256 when);

    uint256 internal unlockTime;
    uint256 internal lockedAmount;
    Lock internal lock;

    /// SETUP FUNCTION ///

    /// @dev An optional function invoked before each test case is run
    function setUp() public virtual override {
        super.setUp();

        unlockTime = block.timestamp + 365 days; // latestTimestamp + ONE_YEAR
        lockedAmount = 1; // 1 GWEI

        lock = new Lock{ value: 1 }(unlockTime);
    }
}
