// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

/// @title Errors
/// @author Ahmed Ali
/// @notice Common errors needed across test contracts.
abstract contract Errors {
    bytes internal LockError_UnlockTimeShouldBeInTheFuture = "Unlock time should be in the future";
    bytes internal LockError_YouCantWithdrawYet = "You can't withdraw yet";
    bytes internal LockError_YouArentTheOwner = "You aren't the owner";
}
