import { expect } from "chai";

export default function shouldBehaveLikeUnlockTime(): void {
  it("should retrieve correct unlockTime", async function () {
    expect(await this.contracts.lock.unlockTime()).to.be.equal(this.unlockTime);
  });
}
