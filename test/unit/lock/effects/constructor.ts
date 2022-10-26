import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Lock__factory } from "../../../../types/factories/Lock__factory";
import { Lock__Errors } from "../../../shared/errors";

export default function shouldBehaveLikeConstructor(): void {
  context("when unlockTime is not in the future", function () {
    it("fails", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const LockFactory = (await ethers.getContractFactory("Lock")) as Lock__factory;
      await expect(LockFactory.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        Lock__Errors.UnlockTimeShouldBeInTheFuture
      );
    });
  });

  context("when unlockTime is in future", function () {
    it("retrieves correct lockedAmount", async function () {
      expect(await ethers.provider.getBalance(this.contracts.lock.address)).to.equal(
        this.lockedAmount
      );
    });
  });
}
