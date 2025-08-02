import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Lock__factory } from "../../../../types/factories/Lock__factory";

export default function shouldBehaveLikeConstructor(): void {
  context("when unlockTime is not in the future", function () {
    it("fails", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const LockFactory = (await ethers.getContractFactory("Lock")) as Lock__factory;
      await expect(LockFactory.deploy(latestTime, { value: 1 })).to.be.reverted;
    });
  });

  context("when unlockTime is in future", function () {
    it("retrieves correct lockedAmount", async function () {
      const address = await this.contracts.lock.getAddress();
      const balance = await ethers.provider.getBalance(address);
      expect(balance).to.equal(this.lockedAmount);
    });
  });
}
