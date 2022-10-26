// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "forge-std/Script.sol";
import { Lock } from "contracts/Lock.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract LockScript is Script {
    Lock internal lock;

    function run() external {
        // Load private key directly from env
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // vm.startBroadcast(deployerPrivateKey);

        vm.startBroadcast();

        // deploy our contract
        lock = new Lock{ value: 1 }(block.timestamp + 365 days);

        vm.stopBroadcast();
    }
}
