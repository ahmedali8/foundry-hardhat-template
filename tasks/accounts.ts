import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts").setAction(
  async (_taskArgs, hre) => {
    const { ethers } = hre;
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
      console.log(
        `${account.address}: ${ethers.utils.formatUnits(
          await ethers.provider.getBalance(account.address),
          "ether"
        )} ETH`
      );
    }
  }
);
