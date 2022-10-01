import shouldBehaveLikeMint from "./effects/mint";
import shouldBehaveLikeERC20BalanceOf from "./view/balanceOf";
import shouldBehaveLikeNameGetter from "./view/name";
import shouldBehaveLikeSymbolGetter from "./view/symbol";

export function shouldBehaveLikeToken(): void {
  describe("View Functions", function () {
    describe("name", function () {
      shouldBehaveLikeNameGetter();
    });

    describe("symbol", function () {
      shouldBehaveLikeSymbolGetter();
    });

    describe("balanceOf", function () {
      shouldBehaveLikeERC20BalanceOf();
    });
  });

  describe("Effects Functions", function () {
    describe("mint", function () {
      shouldBehaveLikeMint();
    });
  });
}
