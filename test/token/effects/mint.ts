import type { BigNumber } from "@ethersproject/bignumber";
import { AddressZero, MaxUint256, Zero } from "@ethersproject/constants";

import { toBN, toWei } from "../../../utils/format";
import { TokenErrors } from "../../shared/errors";
import { expect } from "../../shared/expect";

export default function shouldBehaveLikeMint(): void {
  context("when the beneficiary is the zero address", function () {
    it("reverts", async function () {
      await expect(
        this.token.connect(this.signers.user).mint(AddressZero, Zero)
      ).to.be.revertedWith(TokenErrors.MintZeroAddress);
    });
  });

  context("when the beneficiary is not the zero address", function () {
    context("when the mint results into an overflow", function () {
      beforeEach(async function () {
        await this.token.connect(this.signers.user).mint(this.signers.user.address, toBN("1"));
      });

      it("reverts", async function () {
        await expect(
          this.token.connect(this.signers.user).mint(this.signers.user.address, MaxUint256)
        ).to.be.reverted;
      });
    });

    context("when the mint does not result into an overflow", function () {
      const mintAmount: BigNumber = toWei("100");

      it("increases the balance of the beneficiary", async function () {
        await this.token.connect(this.signers.user).mint(this.signers.user.address, mintAmount);
        expect(await this.token.balanceOf(this.signers.user.address)).to.equal(mintAmount);
      });

      it("increases the total supply", async function () {
        const preTotalSupply: BigNumber = await this.token.totalSupply();
        await this.token.connect(this.signers.user).mint(this.signers.user.address, mintAmount);
        const postTotalSupply = await this.token.totalSupply();
        expect(preTotalSupply).to.equal(postTotalSupply.sub(mintAmount));
      });

      it("emits a Transfer event", async function () {
        await expect(
          this.token.connect(this.signers.user).mint(this.signers.user.address, mintAmount)
        )
          .to.emit(this.token, "Transfer")
          .withArgs(AddressZero, this.signers.user.address, mintAmount);
      });
    });
  });
}
