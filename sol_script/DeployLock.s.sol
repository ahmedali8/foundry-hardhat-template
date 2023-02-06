// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.18;

import { Script } from "forge-std/Script.sol";
import { Lock } from "contracts/Lock.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract DeployLock is Script {
    address internal deployer;
    Lock internal lock;

    // use deployerPrivateKey if private key is used
    // uint256 internal deployerPrivateKey;

    function setUp() public virtual {
        // Load private key directly from env
        // deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Load mnemonic directly from env
        string memory mnemonic = vm.envString("MNEMONIC");
        (deployer, ) = deriveRememberKey(mnemonic, 0);
    }

    function run() external {
        // use deployerPrivateKey if private key is used
        vm.startBroadcast(deployer);

        // deploy our contract
        lock = new Lock{ value: 1 }(block.timestamp + 365 days);

        vm.stopBroadcast();
    }
}
