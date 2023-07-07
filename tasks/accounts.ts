import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { task } from "hardhat/config";

import { fromWei } from "../utils/format";

task("accounts", "Prints the list of accounts").setAction(async (_taskArgs, hre) => {
  const { ethers } = hre;
  const accounts: HardhatEthersSigner[] = await ethers.getSigners();

  interface AccountsArray {
    address: string;
    balanceInETH: string;
  }
  const accountsArray: Array<AccountsArray> = [];

  for (const account of accounts) {
    const address = account.address;
    const balanceInETH = fromWei(await account.provider.getBalance(address));

    accountsArray.push({
      address,
      balanceInETH,
    });
  }

  console.table(accountsArray);
});
