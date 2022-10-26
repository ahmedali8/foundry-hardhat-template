// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import { LockTest } from "../LockTest.t.sol";

contract Lock__Withdraw is LockTest {
    /// @dev it should revert.
    function testCannotWithdraw__CalledTooSoon() external {
        // Run the test.
        vm.expectRevert(LockError__YouCantWithdrawYet);
        lock.withdraw();
    }

    modifier CalledOnTime() {
        _;
    }

    /// @dev it should revert.
    function testCannotWithdraw__CalledFromAnotherAccount() external CalledOnTime {
        // We can increase the time to unlockTime.
        vm.warp(unlockTime);

        address anotherAccount = users[0];
        // We can change the `msg.sender` to another account.
        changePrank(anotherAccount);

        // Run the test.
        vm.expectRevert(LockError__YouArentTheOwner);
        lock.withdraw();
    }

    modifier CalledFromOwner() {
        _;
    }

    /// @dev it should emit Withdrawal event.
    function testWithdraw__CalledFromOwnerOnTime__Event() external CalledOnTime CalledFromOwner {
        // We can increase the time to unlockTime.
        vm.warp(unlockTime);

        // Run the test.
        vm.expectEmit(true, true, false, true);
        emit Withdrawal(lockedAmount, block.timestamp);
        lock.withdraw();
    }

    /// @dev it should transfer the funds to the owner.
    function testWithdraw__CalledFromOwnerOnTime__TransferFundsToOwner()
        external
        CalledOnTime
        CalledFromOwner
    {
        // We can increase the time to unlockTime.
        vm.warp(unlockTime);

        uint256 prevLockBalance = address(lock).balance;
        uint256 prevOwnerBalance = deployer.balance;

        // Run the test.
        lock.withdraw();

        uint256 actualLockBalance = address(lock).balance;
        uint256 expectedLockBalance = 0;
        assertEq(actualLockBalance, expectedLockBalance);

        uint256 actualDeployerBalance = deployer.balance;
        uint256 expectedDeployerBalance = prevLockBalance + prevOwnerBalance;
        assertEq(actualDeployerBalance, expectedDeployerBalance);
    }
}
