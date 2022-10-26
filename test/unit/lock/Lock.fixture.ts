import { time } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import type { Lock } from "../../../types/Lock";
import type { Lock__factory } from "../../../types/factories/Lock__factory";

export async function lockFixture(): Promise<{
  lock: Lock;
  unlockTime: number;
  lockedAmount: number;
}> {
  const signers = await ethers.getSigners();
  const deployer: SignerWithAddress = signers[0];

  const LockFactory: Lock__factory = (await ethers.getContractFactory("Lock")) as Lock__factory;

  const ONE_YEAR_IN_SECS = time.duration.years(1);
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  type DeployArgs = Parameters<typeof LockFactory.deploy>;
  const args: DeployArgs = [unlockTime, { value: lockedAmount }];

  const lock: Lock = (await LockFactory.connect(deployer).deploy(...args)) as Lock;

  return { lock, unlockTime, lockedAmount };
}
