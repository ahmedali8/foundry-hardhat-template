// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Base_Test } from "../Base.t.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

/// @dev See the "Writing Tests" section in the Foundry Book if this is your first time with Forge.
/// https://book.getfoundry.sh/forge/writing-tests
contract ForkTest is Base_Test {
    /// @dev Test that runs against a fork of Ethereum Mainnet. You need to set `ALCHEMY_API_KEY` in
    /// your environment
    /// for this test to run - you can get an API key for free at https://alchemy.com.
    function testFork_Example() external {
        string memory alchemyApiKey = vm.envOr("ALCHEMY_API_KEY", string(""));
        // Silently pass this test if the user didn't define the API key.
        if (bytes(alchemyApiKey).length == 0) {
            return;
        }

        // Run the test normally, otherwise.
        vm.createSelectFork({ urlOrAlias: "ethereum", blockNumber: 16_428_000 });
        address usdc = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        address holder = 0x7713974908Be4BEd47172370115e8b1219F4A5f0;
        uint256 actualBalance = IERC20(usdc).balanceOf(holder);
        uint256 expectedBalance = 196_307_713.810457e6;
        assertEq(actualBalance, expectedBalance);
    }
}
