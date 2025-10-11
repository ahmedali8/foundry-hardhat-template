import shouldBehaveLikeConstructor from "./effects/constructor";
import shouldBehaveLikeWithdraw from "./effects/withdraw";
import shouldBehaveLikeOwner from "./view/owner";
import shouldBehaveLikeUnlockTime from "./view/unlockTime";

export function shouldBehaveLikeLockContract(): void {
  describe("View Functions", () => {
    describe("#owner", () => {
      shouldBehaveLikeOwner();
    });
    describe("#unlockTime", () => {
      shouldBehaveLikeUnlockTime();
    });
  });

  describe("Effects Functions", () => {
    describe("#constructor", () => {
      shouldBehaveLikeConstructor();
    });
    describe("#withdraw", () => {
      shouldBehaveLikeWithdraw();
    });
  });
}
