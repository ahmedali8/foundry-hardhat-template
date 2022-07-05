import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, waffle } from "hardhat";

import { Signers } from "./shared/types";
import { testToken } from "./token/Token";

const { createFixtureLoader } = waffle;

describe("Unit tests", () => {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.owner = signers[0];
    this.signers.user = signers[1];
    this.signers.accounts = signers.slice(2);

    this.loadFixture = createFixtureLoader();
  });

  testToken();
});
