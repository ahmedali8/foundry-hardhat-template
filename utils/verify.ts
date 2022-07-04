import { TransactionResponse } from "@ethersproject/abstract-provider";
import { run } from "hardhat";

import { delayLog } from "./misc";

export async function waitForConfirmations(tx: TransactionResponse, waitConfirmations = 5) {
  if (!tx) return;
  console.log(`waiting for ${waitConfirmations} confirmations ...`);
  await tx.wait(waitConfirmations);
}

interface VerifyContract {
  contractPath: string;
  contractAddress: string;
  args: any[];
  delay?: number;
}

/**
 * Programmatically verify a contract
 * @param contractPath contract name in string e.g. `contracts/${contractName}.sol:${contractName}`
 * @param contractAddress contract address in string
 * @param args constructor args in array
 * @param delay delay time in ms
 */
export async function verifyContract({
  contractPath,
  contractAddress,
  args = [],
  delay = 60_000,
}: VerifyContract): Promise<void> {
  await delayLog(delay);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: contractPath,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}
