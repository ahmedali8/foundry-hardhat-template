// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23 <=0.9.0;

import { Script } from "forge-std/Script.sol";

abstract contract BaseScript is Script {
    /// @dev Included to enable compilation of the script without a $MNEMONIC environment variable.
    string internal constant TEST_MNEMONIC =
        "test test test test test test test test test test test junk";

    /// @dev Needed for the deterministic deployments.
    bytes32 internal constant ZERO_SALT = bytes32(0);

    /// @dev The address of the transaction broadcaster.
    address internal broadcaster;

    /// @dev Used to derive the broadcaster's address if $PRIVATE_KEY is not defined.
    string internal mnemonic;

    /// @dev The private key of the transaction broadcaster.
    uint256 private broadcasterPK;

    /// @dev Initializes the transaction broadcaster like this:
    ///
    /// - If $PRIVATE_KEY is defined, use it.
    /// - Otherwise, derive the broadcaster address from $MNEMONIC.
    /// - If $MNEMONIC is not defined, default to a test mnemonic.
    constructor() {
        uint256 privateKey = vm.envOr({ name: "PRIVATE_KEY", defaultValue: uint256(0) });

        if (privateKey != 0) {
            broadcaster = vm.addr(privateKey);
            broadcasterPK = privateKey;
        } else {
            mnemonic = vm.envOr({ name: "MNEMONIC", defaultValue: TEST_MNEMONIC });
            (broadcaster, broadcasterPK) = deriveRememberKey({ mnemonic: mnemonic, index: 0 });
        }
    }

    modifier broadcast() {
        vm.startBroadcast(broadcasterPK);
        _;
        vm.stopBroadcast();
    }
}
