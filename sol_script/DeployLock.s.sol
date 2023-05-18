// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.18;

import { BaseScript } from "./BaseScript.s.sol";
import { Lock } from "contracts/Lock.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract DeployLock is BaseScript {
    Lock internal lock;

    function run() external {
        // use deployerPrivateKey if private key is used
        vm.startBroadcast(deployer);

        // deploy our contract
        lock = new Lock{ value: 1 }(block.timestamp + 365 days);

        vm.stopBroadcast();
    }
}
