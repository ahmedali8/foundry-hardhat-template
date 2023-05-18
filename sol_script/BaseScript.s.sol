// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

import { Script } from "forge-std/Script.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract BaseScript is Script {
    address internal deployer;

    // use deployerPrivateKey if private key is used
    // uint256 internal deployerPrivateKey;

    function setUp() public virtual {
        // Load private key directly from env
        // deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Load mnemonic directly from env
        string memory mnemonic = vm.envString("MNEMONIC");
        (deployer, ) = deriveRememberKey(mnemonic, 0);
    }
}
