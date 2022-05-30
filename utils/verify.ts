import { TransactionResponse } from "@ethersproject/abstract-provider";
import { run } from "hardhat";

import { delayLog } from "./misc";

export async function waitForConfirmations(
  tx: TransactionResponse,
  waitConfirmations = 5
) {
  if (!tx) return;
  console.log(`waiting for ${waitConfirmations} confirmations ...`);
  await tx.wait(waitConfirmations);
}

interface VerifyContract {
  contractName: string;
  contractAddress: string;
  args: any[];
  delay?: number;
}

/**
 * Programmatically verify a contract
 * @param {*} contractName contract name in string
 * @param {*} contractAddress contract address in string
 * @param {*} args constructor args in array
 * @param delay delay time in ms
 */
export async function verifyContract({
  contractName,
  contractAddress,
  args = [],
  delay = 60_000,
}: VerifyContract): Promise<void> {
  await delayLog(delay);

  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
    contract: `contracts/${contractName}.sol:${contractName}`,
  });
}
