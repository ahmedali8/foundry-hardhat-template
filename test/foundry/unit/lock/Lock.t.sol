// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Base_Test } from "../../Base.t.sol";
import { Lock } from "contracts/Lock.sol";

/// @notice Common logic needed by all {Lock} tests.
abstract contract Lock_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/
    event Withdrawal(uint256 amount, uint256 when);

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

    function setUp() public virtual override {
        Base_Test.setUp();
        deployLock();
    }

    /// @dev Deploys {Lock} contract
    function deployLock() internal {
        unlockTime = block.timestamp + ONE_YEAR; // latestTimestamp + ONE_YEAR
        lockedAmount = ONE_WEI;

        lock = new Lock{ value: ONE_WEI }(unlockTime);
        vm.label({ account: address(lock), newLabel: "Lock" });
    }
}
