import shouldBehaveLikeConstructor from "./effects/constructor";
import shouldBehaveLikeWithdraw from "./effects/withdraw";
import shouldBehaveLikeOwner from "./view/owner";
import shouldBehaveLikeUnlockTime from "./view/unlockTime";

export function shouldBehaveLikeLockContract(): void {
  describe("View Functions", function () {
    describe("#owner", function () {
      shouldBehaveLikeOwner();
    });
    describe("#unlockTime", function () {
      shouldBehaveLikeUnlockTime();
    });
  });

  describe("Effects Functions", function () {
    describe("#constructor", function () {
      shouldBehaveLikeConstructor();
    });
    describe("#withdraw", function () {
      shouldBehaveLikeWithdraw();
    });
  });
}
