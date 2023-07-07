// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

import { BaseScript } from "./Base.s.sol";
import { Lock } from "contracts/Lock.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract DeployLock is BaseScript {
    function run() public broadcast returns (Lock lock) {
        // deploy our contract
        lock = new Lock{ value: 1 }(block.timestamp + 365 days);
    }
}
