import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { Errors } from "../../../shared/errors";

export default function shouldBehaveLikeWithdraw(): void {
  context("when called too soon", function () {
    it("reverts", async function () {
      await expect(this.contracts.lock.withdraw()).to.be.revertedWithCustomError(
        this.contracts.lock,
        Errors.Lock_CannotWithdrawYet
      );
    });
  });

  context("when called from another account", function () {
    it("reverts", async function () {
      const anotherAccount = this.signers.accounts[0];
      // We can increase the time in Hardhat Network
      await time.increaseTo(this.unlockTime);

      // We use lock.connect() to send a transaction from another account
      await expect(
        this.contracts.lock.connect(anotherAccount).withdraw()
      ).to.be.revertedWithCustomError(this.contracts.lock, Errors.Lock_CallerNotOwner);
    });
  });

  context("when unlockTime has arrived and the owner calls it", function () {
    it("emits Withdrawal event", async function () {
      await time.increaseTo(this.unlockTime);

      await expect(this.contracts.lock.withdraw())
        .to.emit(this.contracts.lock, "Withdrawal")
        .withArgs(this.lockedAmount, anyValue); // We accept any value as `when` arg
    });

    it("transfers the funds to the owner", async function () {
      await time.increaseTo(this.unlockTime);

      await expect(this.contracts.lock.withdraw()).to.changeEtherBalances(
        [this.signers.deployer, this.contracts.lock],
        [this.lockedAmount, -this.lockedAmount]
      );
    });
  });
}
