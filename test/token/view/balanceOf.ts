import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import { toWei } from "../../../utils/format";
import { expect } from "../../shared/expect";

export default function shouldBehaveLikeBalanceOf(): void {
  context("when the account does not have a balance", function () {
    it("retrieves zero", async function () {
      const balance: BigNumber = await this.token.balanceOf(this.signers.user.address);
      expect(balance).to.equal(Zero);
    });
  });

  context("when the account has a balance", function () {
    const initialBalance: BigNumber = toWei("100");

    beforeEach(async function () {
      await this.token.connect(this.signers.user).mint(this.signers.user.address, initialBalance);
    });

    it("retrieves the correct balance", async function () {
      expect(await this.token.balanceOf(this.signers.user.address)).to.be.equal(initialBalance);
    });
  });
}
