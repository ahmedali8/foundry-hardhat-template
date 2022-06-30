import { BigNumber } from "@ethersproject/bignumber";

import { toBN } from "./format";

export const ZERO_ADDRESS: string = "0x0000000000000000000000000000000000000000";

export const ZERO_BYTES32: string =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const MAX_UINT256: BigNumber = toBN(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);
