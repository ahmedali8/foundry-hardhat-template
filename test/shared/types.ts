import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import { Token } from "../../src/types";

declare module "mocha" {
  export interface Context {
    token: Token;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  owner: SignerWithAddress;
  user: SignerWithAddress;
  accounts: SignerWithAddress[];
}
