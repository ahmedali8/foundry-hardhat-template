import { ethers } from "hardhat";

import { verifyContract } from "../utils/verify";

async function main() {
  const { chainId } = await ethers.provider.getNetwork();

  const contractName = "Lock";
  const contractPath = `contracts/${contractName}.sol:${contractName}`;
  const contractAddress = "";

  // biome-ignore lint/suspicious/noExplicitAny: template for verification
  const args: any[] = ["878979"];

  // You don't want to verify on localhost
  if (chainId !== 31337n && chainId !== 1337n) {
    await verifyContract({
      args,
      contractAddress,
      contractPath,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
