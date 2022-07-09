import { deployments, ethers } from "hardhat";

import { Token } from "../../../src/types";
// import { tokenFixture } from "../../shared/fixtures";
import { shouldBehaveLikeToken } from "./Token.behavior";

export function testToken(): void {
  describe("Token", function () {
    beforeEach(async function () {
      await deployments.fixture(["Token"]);
      const token = (await ethers.getContract("Token")) as Token;
      // const { token } = await this.loadFixture(tokenFixture);
      this.token = token;
    });

    shouldBehaveLikeToken();
  });
}
