// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { LockTest } from "../LockTest.t.sol";

contract Lock_Withdraw is LockTest {
    /// @dev it should revert.
    function test_RevertWhen_CalledTooSoon() external {
        vm.expectRevert(LockError_YouCantWithdrawYet);
        lock.withdraw();
    }

    modifier CalledOnTime() {
        _;
    }

    function increaseTimeToUnlockTime() internal {
        vm.warp(unlockTime);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_CalledFromAnotherAccount(
        address anotherAccount
    ) external CalledOnTime {
        vm.assume(anotherAccount != address(0));
        vm.assume(anotherAccount != deployer);

        // We can increase the time to unlockTime.
        increaseTimeToUnlockTime();

        // We can change the `msg.sender` to another account.
        changePrank(anotherAccount);

        // Run the test.
        vm.expectRevert(LockError_YouArentTheOwner);
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
        uint256 prevOwnerBalance = deployer.balance;

        lock.withdraw();

        uint256 actualLockBalance = address(lock).balance;
        uint256 expectedLockBalance = 0;
        assertEq(actualLockBalance, expectedLockBalance);

        uint256 actualDeployerBalance = deployer.balance;
        uint256 expectedDeployerBalance = prevLockBalance + prevOwnerBalance;
        assertEq(actualDeployerBalance, expectedDeployerBalance);
    }
}
