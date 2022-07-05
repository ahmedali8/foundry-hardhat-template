// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import { Token } from "contracts/Token.sol";

contract TokenScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // deploy our contract
        new Token("TokenName", "TKN", 1000000e18, msg.sender);

        vm.stopBroadcast();
    }
}
