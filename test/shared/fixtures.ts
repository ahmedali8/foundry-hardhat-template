import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { Token } from "../../src/types";
import { TOKEN_NAME, TOKEN_SYMBOL, TOTAL_SUPPLY } from "./constants";

export async function tokenFixture(): Promise<{ token: Token }> {
  const signers = await ethers.getSigners();
  const owner: SignerWithAddress = signers[0];

  const tokenArtifact: Artifact = await artifacts.readArtifact("Token");
  const token: Token = <Token>(
    await waffle.deployContract(owner, tokenArtifact, [
      TOKEN_NAME,
      TOKEN_SYMBOL,
      TOTAL_SUPPLY,
      owner.address,
    ])
  );

  return { token };
}
