import { ethers } from "hardhat";

/**
 * Increases time of evm blockchain for tests.
 * @param {*} timeInSeconds number - number of seconds to increase.
 */
export async function increaseTime(timeInSeconds: number): Promise<void> {
  await ethers.provider.send("evm_increaseTime", [timeInSeconds]);
  await ethers.provider.send("evm_mine", []);
}
