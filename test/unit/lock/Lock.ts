import { shouldBehaveLikeLockContract } from "./Lock.behavior";
import { lockFixture } from "./Lock.fixture";

export function testLock(): void {
  describe("Lock", function () {
    beforeEach(async function () {
      const { lock, unlockTime, lockedAmount } = await this.loadFixture(lockFixture);
      this.contracts.lock = lock;
      this.unlockTime = unlockTime;
      this.lockedAmount = lockedAmount;
    });

    shouldBehaveLikeLockContract();
  });
}
