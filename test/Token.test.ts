import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Token, Token__factory } from "../src/types";
import { ZERO_ADDRESS } from "../utils/constants";
import { toWei } from "../utils/format";

describe("Token Unit tests", () => {
  let token: Token;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    [owner, user, ...accounts] = await ethers.getSigners();

    const TokenFactory: Token__factory = await ethers.getContractFactory("Token");
    token = await TokenFactory.deploy("TEST_TOKEN", "TST", toWei("1000000"), owner.address);
  });

  describe("#constructor", async () => {
    it("has a name", async () => {
      const name = await token.name();
      expect(name).to.equal("TEST_TOKEN");
    });

    it("has a symbol", async () => {
      const symbol = await token.symbol();
      expect(symbol).to.equal("TST");
    });

    it("checks if owner has the tokens", async () => {
      const balance = await token.balanceOf(owner.address);
      expect(balance).to.equal(toWei("1000000"));
    });
  });

  describe("#mint", () => {
    it("mints 100 tokens to user", async () => {
      await token.connect(owner).mint(user.address, toWei("100"));
      expect(await token.balanceOf(user.address)).to.equal(toWei("100"));
    });

    it("fails to mint if account is zero address", async () => {
      await expect(token.connect(accounts[0]).mint(ZERO_ADDRESS, toWei("1"))).to.be.revertedWith(
        "ERC20: mint to the zero address"
      );
    });
  });
});
