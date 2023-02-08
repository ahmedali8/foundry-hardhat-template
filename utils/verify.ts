/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TransactionResponse } from "@ethersproject/abstract-provider";
import { run } from "hardhat";

import { delayLog } from "./misc";

/**
 * Waits for the specified number of confirmations for a given transaction.
 *
 * @param {TransactionResponse} tx - The transaction response to wait for confirmations.
 * @param {number} [waitConfirmations=5] - The number of confirmations to wait for.
 * @returns {Promise<void>} A promise that resolves when the specified number of confirmations have been received.
 */
export async function waitForConfirmations(
  tx: TransactionResponse,
  waitConfirmations: number = 5
): Promise<void> {
  if (!tx) return;
  console.log(`waiting for ${waitConfirmations} confirmations ...`);
  await tx.wait(waitConfirmations);
}

/**
 * Interface for the input parameters of `verifyContract` function.
 *
 * @interface VerifyContractParams
 *
 * @property {string} contractAddress - The address of the contract to verify.
 * @property {any[]} args - The constructor arguments for the contract.
 * @property {string} [contractPath] - The path to the contract to be verified.
 * @property {number} [delay=60_000] - The delay time in milliseconds before verifying the contract.
 */
interface VerifyContractParams {
  contractAddress: string;
  args: any[];
  contractPath?: string;
  delay?: number;
}

/**
 * Programmatically verify the given contract using the specified parameters.
 *
 * @param {Object} VerifyContractParams
 *
 * @property {string} contractAddress - The address of the contract to verify.
 * @property {any[]} [args=[]] - The constructor arguments for the contract.
 * @property {string} [contractPath] - The path to the contract to be verified e.g. \`contracts/${contractName}.sol:${contractName}\`.
 * @property {number} [delay=60_000] - The delay time in milliseconds before verifying the contract.
 * @returns {Promise<void>} A promise that resolves when the contract has been verified.
 */
export async function verifyContract({
  contractAddress,
  args = [],
  contractPath,
  delay = 60_000,
}: VerifyContractParams): Promise<void> {
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
