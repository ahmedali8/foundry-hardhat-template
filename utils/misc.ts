import type { TransactionResponse } from "@ethersproject/abstract-provider";
import { getAddress } from "@ethersproject/address";
import { keccak256 } from "@ethersproject/solidity";
import { computeAddress } from "@ethersproject/transactions";

import { fromWei, toGwei } from "./format";

export async function sleep(ms: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function delayLog(ms: number) {
  console.log(`waiting for ${ms / 1000}s...`);
  await sleep(ms);
}

/**
 * returns the checksummed address if the address is valid,
 * otherwise returns false
 */
export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function createRandomChecksumAddress(salt: string): string {
  const signerAddress: string = computeAddress(keccak256(["string"], [salt]));
  const checkSummedSignerAddress: string = getAddress(signerAddress);
  return checkSummedSignerAddress;
}

/**
 * Get necessary Gas information of a transaction.
 * @param {*} tx transaction response if contract deployed
 * or other transaction executed
 * @returns null or information string
 */
export async function getExtraGasInfo(tx: TransactionResponse): Promise<string | null> {
  if (!tx) return null;
  const gasPrice = tx.gasPrice;
  if (gasPrice === undefined) return null;
  const gasUsed = tx.gasLimit.mul(gasPrice);
  const txReceipt = await tx.wait();
  const gas = txReceipt.gasUsed;

  const extraGasInfo = `${toGwei(gasPrice)} gwei, ${fromWei(gasUsed)} ETH, ${gas} gas,
  txHash ${tx.hash}`;

  return extraGasInfo;
}
