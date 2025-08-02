// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

library Errors {
    error Lock_CallerNotOwner();
    error Lock_CannotWithdrawYet();
    error Lock_UnlockTimeShouldBeInTheFuture();
}
