// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23;

import { Lock } from "contracts/Lock.sol";

import { BaseScript } from "./Base.s.sol";

/// @dev See the Solidity Scripting tutorial:
/// https://book.getfoundry.sh/tutorials/solidity-scripting
contract DeployLock is BaseScript {
    function run() public virtual broadcast returns (Lock lock) {
        // deploy our contract
        lock = new Lock{ value: 1 }(block.timestamp + 365 days);
    }
}
