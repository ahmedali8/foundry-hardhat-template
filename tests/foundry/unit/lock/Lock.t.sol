// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Base_Test } from "../../Base.t.sol";
import { Lock } from "contracts/Lock.sol";

/// @title Lock Test Base Contract
/// @author @0xdev8
/// @notice Common logic needed by all {Lock} tests
abstract contract Lock_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    /// @notice Event emitted when funds are withdrawn from the lock contract
    /// @param amount The amount of ETH withdrawn
    /// @param when The timestamp when the withdrawal occurred
    event Withdrawal(uint256 indexed amount, uint256 indexed when);

    /*//////////////////////////////////////////////////////////////
                               CONSTANTS
    //////////////////////////////////////////////////////////////*/
    uint256 internal constant ONE_YEAR = 365 days;
    uint256 internal constant ONE_WEI = 1;

    /*//////////////////////////////////////////////////////////////
                               VARIABLES
    //////////////////////////////////////////////////////////////*/
    uint256 internal unlockTime;
    uint256 internal lockedAmount;

    /*//////////////////////////////////////////////////////////////
                            SET-UP FUNCTION
    //////////////////////////////////////////////////////////////*/

    /// @notice Sets up the test environment and deploys the Lock contract
    function setUp() public virtual override {
        Base_Test.setUp();
        deployLock();
    }

    /// @notice Deploys the Lock contract with test parameters
    function deployLock() internal {
        unlockTime = block.timestamp + ONE_YEAR; // latestTimestamp + ONE_YEAR
        lockedAmount = ONE_WEI;

        lock = new Lock{ value: ONE_WEI }(unlockTime);
        vm.label({ account: address(lock), newLabel: "Lock" });
    }
}
