// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title Errors Library
/// @author @0xdev8
/// @notice A library containing custom errors for the Lock contract
library Errors {
    error Lock_CallerNotOwner();
    error Lock_CannotWithdrawYet();
    error Lock_UnlockTimeShouldBeInTheFuture();
}
