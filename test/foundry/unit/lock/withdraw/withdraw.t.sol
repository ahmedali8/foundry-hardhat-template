// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Errors } from "contracts/Lock.sol";

import { Lock_Test } from "../Lock.t.sol";

/// @title Lock Withdraw Tests
/// @author @0xdev8
/// @notice Tests for the Lock contract withdraw functionality
contract Lock_Withdraw is Lock_Test {
    /// @notice Test that withdraw reverts when called before unlock time
    function test_RevertWhen_CalledTooSoon() external {
        vm.expectRevert(Errors.Lock_CannotWithdrawYet.selector);
        lock.withdraw();
    }

    modifier CalledOnTime() {
        _;
    }

    /// @notice Helper function to increase time to unlock time
    function increaseTimeToUnlockTime() internal {
        vm.warp(unlockTime);
    }

    /// @notice Test that withdraw reverts when called from another account
    /// @param anotherAccount The address of the non-owner account trying to withdraw
    function testFuzz_RevertWhen_CalledFromAnotherAccount(address anotherAccount)
        external
        CalledOnTime
    {
        vm.assume(anotherAccount != address(0));
        vm.assume(anotherAccount != users.deployer);

        // We can increase the time to unlockTime.
        increaseTimeToUnlockTime();

        // We can change the `msg.sender` to another account.
        changePrank(anotherAccount);

        // Run the test.
        vm.expectRevert(Errors.Lock_CallerNotOwner.selector);
        lock.withdraw();
    }

    modifier CalledFromOwner() {
        _;
    }

    /// @notice Test that withdraw emits the Withdrawal event when called by owner on time
    function test_CalledFromOwnerOnTime_Event() external CalledOnTime CalledFromOwner {
        // We can increase the time to unlockTime.
        increaseTimeToUnlockTime();

        // Run the test.
        vm.expectEmit(true, true, true, true);
        emit Withdrawal(lockedAmount, block.timestamp);
        lock.withdraw();
    }

    /// @notice Test that withdraw transfers funds to the owner when called on time
    function test_CalledFromOwnerOnTime_TransferFundsToOwner()
        external
        CalledOnTime
        CalledFromOwner
    {
        // We can increase the time to unlockTime.
        increaseTimeToUnlockTime();

        uint256 prevLockBalance = address(lock).balance;
        uint256 prevOwnerBalance = users.deployer.balance;

        lock.withdraw();

        uint256 actualLockBalance = address(lock).balance;
        uint256 expectedLockBalance = 0;
        assertEq(actualLockBalance, expectedLockBalance);

        uint256 actualDeployerBalance = users.deployer.balance;
        uint256 expectedDeployerBalance = prevLockBalance + prevOwnerBalance;
        assertEq(actualDeployerBalance, expectedDeployerBalance);
    }
}
