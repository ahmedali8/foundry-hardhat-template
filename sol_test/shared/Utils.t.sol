// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { Test } from "forge-std/Test.sol";

/// @title Utils
/// @author Ahmed Ali
/// @notice Common utils needed across test contracts.
abstract contract Utils is Test {
    bytes32 internal nextUser = keccak256(abi.encodePacked("user address"));

    /// @dev Create random user.
    function getNextUserAddress() internal returns (address payable) {
        address payable user = payable(address(uint160(uint256(nextUser))));
        nextUser = keccak256(abi.encodePacked(nextUser));
        return user;
    }

    /// @dev Create user with 100 eth balance
    function createUser() internal returns (address payable) {
        return createUser(100 ether);
    }

    /// @dev Create user with `bal` balance
    function createUser(uint256 bal) internal returns (address payable) {
        address payable user = getNextUserAddress();
        vm.deal(user, bal);
        return user;
    }

    /// @dev Create named user with 100 eth balance
    function createNamedUser(string memory name) internal returns (address payable) {
        return createNamedUser(name, 100 ether);
    }

    /// @dev Create named user with `bal` balance
    function createNamedUser(string memory name, uint256 bal) internal returns (address payable) {
        address payable user = payable(
            address(uint160(uint256(keccak256(abi.encodePacked(name)))))
        );
        vm.label(user, name);
        vm.deal(user, bal);
        return user;
    }

    /// @dev Create users with 100 ETH balance each
    function createUsers(uint256 userNum) internal returns (address payable[] memory) {
        address payable[] memory users = new address payable[](userNum);
        for (uint256 i = 0; i < userNum; i++) {
            users[i] = createUser();
        }

        return users;
    }

    /// @dev Move block.number forward by a given number of blocks
    function mineBlocks(uint256 numBlocks) internal {
        uint256 targetBlock = block.number + numBlocks;
        vm.roll(targetBlock);
    }

    /// @dev Helper function that multiplies the `amount` by `10^18` and returns a `uint256.`
    function toWei(uint256 value) internal pure returns (uint256) {
        return value * 1e18;
    }

    /// @dev Helper function that multiplies the `amount` by `10^decimals` and returns a `uint256.`
    function toWei(uint256 value, uint256 decimals) internal pure returns (uint256) {
        return value * 10 ** decimals;
    }
}
