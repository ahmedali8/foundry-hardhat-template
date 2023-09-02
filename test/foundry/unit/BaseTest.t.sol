// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;

import { Utils } from "../shared/Utils.t.sol";

/// @title BaseTest
/// @author Ahmed Ali
/// @notice Common contract members needed across test contracts.
/// @dev See the "Writing Tests" section in the Foundry Book if this is your first time with Forge.
/// https://book.getfoundry.sh/forge/writing-tests
abstract contract BaseTest is Utils {
    address payable internal deployer;
    address payable[] internal users;

    /// SETUP FUNCTION ///

    /// @dev An optional function invoked before each test case is run
    function setUp() public virtual {
        deployer = createNamedUser("Deployer");
        users = createUsers(10);

        // Sets all subsequent calls' `msg.sender` to be Deployer.
        vm.startPrank(deployer);
    }
}
