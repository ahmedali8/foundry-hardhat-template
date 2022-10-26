// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import { Utils } from "../shared/Utils.t.sol";

/// @title BaseTest
/// @author Ahmed Ali
/// @notice Common contract members needed across test contracts.
abstract contract BaseTest is Utils {
    address payable internal deployer;
    address payable[] internal users;

    /// SETUP FUNCTION ///

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual {
        deployer = createNamedUser("Deployer");
        users = createUsers(10);

        // Sets all subsequent calls' `msg.sender` to be Deployer.
        vm.startPrank(deployer);
    }
}
