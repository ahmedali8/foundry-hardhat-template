// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26;

import { Lock } from "contracts/Lock.sol";

import { BaseScript } from "./Base.s.sol";

/// @dev See the Solidity Scripting tutorial:
/// https://book.getfoundry.sh/tutorials/solidity-scripting
contract DeployLock is BaseScript {
    function run() public virtual broadcast returns (Lock lock) {
        lock = deployLock();
    }

    function deployLock() public returns (Lock lock) {
        uint256 unlockTime = block.timestamp + config.get("unlock_time_duration").toUint256();
        lock = new Lock{ value: 1 }(unlockTime);
    }
}
