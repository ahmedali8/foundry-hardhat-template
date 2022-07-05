import { expect } from "../../shared/expect";

export default function shouldBehaveLikeSymbolGetter(): void {
  it("retrieves the symbol", async function () {
    const symbol: string = await this.token.symbol();
    expect(symbol).to.equal("TST");
  });
}
