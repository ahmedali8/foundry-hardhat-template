import { computeAddress, getAddress, solidityPackedKeccak256 } from "ethers";

/**
 * Asynchronously sleeps for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Asynchronously logs a message and waits for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 */
export async function delayLog(ms: number): Promise<void> {
  console.log(`Waiting for ${ms / 1000}s...`);
  await sleep(ms);
}

/**
 * Creates a random checksummed address using the provided salt.
 *
 * @param salt - The salt to generate the address.
 * @returns The checksummed address.
 */
export function createRandomChecksumAddress(salt: string): string {
  const signerAddress: string = computeAddress(solidityPackedKeccak256(["string"], [salt]));
  const checkSummedSignerAddress: string = getAddress(signerAddress);
  return checkSummedSignerAddress;
}
