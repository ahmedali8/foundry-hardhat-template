import { tokenFixture } from "../shared/fixtures";
import { shouldBehaveLikeToken } from "./Token.behavior";

export function testToken(): void {
  describe("Token", function () {
    beforeEach(async function () {
      const { token } = await this.loadFixture(tokenFixture);
      this.token = token;
    });

    shouldBehaveLikeToken();
  });
}
