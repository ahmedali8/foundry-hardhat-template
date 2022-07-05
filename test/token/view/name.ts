import { expect } from "../../shared/expect";

export default function shouldBehaveLikeNameGetter(): void {
  it("retrieves the name", async function () {
    const name: string = await this.token.name();
    expect(name).to.equal("TEST_TOKEN");
  });
}
