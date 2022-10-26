// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

/// @title Errors
/// @author Ahmed Ali
/// @notice Common errors needed across test contracts.
abstract contract Errors {
    bytes internal LockError__UnlockTimeShouldBeInTheFuture = "Unlock time should be in the future";
    bytes internal LockError__YouCantWithdrawYet = "You can't withdraw yet";
    bytes internal LockError__YouArentTheOwner = "You aren't the owner";
}
