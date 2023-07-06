import { task } from "hardhat/config";

task("wallet", "Create a wallet (pk) link", async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();

  console.log(
    `🔐 WALLET Generated: ${randomWallet.address}, Private Key: ${randomWallet.privateKey}`
  );
});
