import { shouldBehaveLikeToken } from "./Token.behavior";
import { tokenFixture } from "./Token.fixture";

export function testToken(): void {
  describe("Token", function () {
    beforeEach(async function () {
      const { token } = await this.loadFixture(tokenFixture);
      this.token = token;
    });

    shouldBehaveLikeToken();
  });
}
