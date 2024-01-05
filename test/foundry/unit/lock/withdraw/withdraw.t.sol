// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Errors } from "contracts/Lock.sol";

import { Lock_Test } from "../Lock.t.sol";

contract Lock_Withdraw is Lock_Test {
    /// @dev it should revert.
    function test_RevertWhen_CalledTooSoon() external {
        vm.expectRevert(Errors.Lock_CannotWithdrawYet.selector);
        lock.withdraw();
    }

    modifier CalledOnTime() {
        _;
    }

    function increaseTimeToUnlockTime() internal {
        vm.warp(unlockTime);
    }

    /// @dev it should revert.
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

    /// @dev it should emit Withdrawal event.
    function test_CalledFromOwnerOnTime_Event() external CalledOnTime CalledFromOwner {
        // We can increase the time to unlockTime.
        increaseTimeToUnlockTime();

        // Run the test.
        vm.expectEmit(true, true, true, true);
        emit Withdrawal(lockedAmount, block.timestamp);
        lock.withdraw();
    }

    /// @dev it should transfer the funds to the owner.
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
