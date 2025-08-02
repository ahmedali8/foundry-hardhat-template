// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.26 <0.9.0;

import { Test } from "forge-std/src/Test.sol";

import { Lock } from "contracts/Lock.sol";

import { Users } from "./utils/Types.sol";

/// @title Base Test Contract
/// @author @0xdev8
/// @notice Common contract members needed across test contracts
abstract contract Base_Test is Test {
    /*//////////////////////////////////////////////////////////////
                               VARIABLES
    //////////////////////////////////////////////////////////////*/

    Users internal users;

    /*//////////////////////////////////////////////////////////////
                             TEST CONTRACTS
    //////////////////////////////////////////////////////////////*/

    Lock internal lock;

    /*//////////////////////////////////////////////////////////////
                            SET-UP FUNCTION
    //////////////////////////////////////////////////////////////*/

    /// @notice A setup function invoked before each test case
    function setUp() public virtual {
        // Create users for testing.
        users = Users({
            deployer: createUser("Deployer"),
            alice: createUser("Alice"),
            bob: createUser("Bob"),
            eve: createUser("Eve")
        });

        // Make the deployer the default caller in all subsequent tests.
        vm.startPrank({ msgSender: users.deployer });
    }

    /*//////////////////////////////////////////////////////////////
                                HELPERS
    //////////////////////////////////////////////////////////////*/

    /// @notice Helper function that multiplies the `amount` by `10^18` and returns a `uint256`
    /// @param value The amount to convert to wei
    /// @return result The amount in wei (value * 10^18)
    function toWei(uint256 value) internal pure returns (uint256 result) {
        result = bn(value, 18);
    }

    /// @notice Helper function that multiplies the `amount` by `10^decimals` and returns a
    /// `uint256`
    /// @param amount The amount to multiply
    /// @param decimals The number of decimal places
    /// @return result The amount multiplied by 10^decimals
    function bn(uint256 amount, uint256 decimals) internal pure returns (uint256 result) {
        result = amount * 10 ** decimals;
    }

    /// @notice Generates a user, labels its address, and funds it with 100 test ether
    /// @param name The name to label the user address
    /// @return payable The created user address with 100 ether balance
    function createUser(string memory name) internal returns (address payable) {
        return createUser(name, 100 ether);
    }

    /// @notice Generates a user, labels its address, and funds it with test balance
    /// @param name The name to label the user address
    /// @param balance The amount of ether to fund the user with
    /// @return payable The created user address with specified balance
    function createUser(string memory name, uint256 balance) internal returns (address payable) {
        address payable user = payable(makeAddr(name));
        vm.deal({ account: user, newBalance: balance });
        return user;
    }
}
