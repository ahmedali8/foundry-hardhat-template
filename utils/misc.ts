import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";

import { fromWei, toGwei } from "./format";

export async function sleep(ms: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function delayLog(ms: number) {
  console.log(`waiting for ${ms / 1000}s...`);
  await sleep(ms);
}

// /**
//  * Get ether balance of address provided.
//  * @param {*} address valid eth address.
//  * @returns undefined or Balance in BN.
//  */
// export async function etherBalance(
//   address: string
// ): Promise<BigNumber | undefined> {
//   if (!isAddress(address)) return;
//   return await ethers.provider.getBalance(address);
// }

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

export async function send(signer: Signer, txParams: any): Promise<TransactionResponse> {
  return await signer.sendTransaction(txParams);
  //    , (error, transactionHash) => {
  //     if (error) {
  //       debug(`Error: ${error}`);
  //     }
  //     debug(`transactionHash: ${transactionHash}`);
  //     // checkForReceipt(2, params, transactionHash, resolve)
  //   });
}

// add 20%
export function calculateGasMargin(value: BigNumber) {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}
