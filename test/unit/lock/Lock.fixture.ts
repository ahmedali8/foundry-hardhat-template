import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ignition } from "hardhat";

import LockModule from "../../../ignition/modules/Lock";
import type { Lock } from "../../../types/Lock";

const ONE_YEAR_IN_SECS = time.duration.years(1);
const ONE_GWEI = 1_000_000_000n;

async function getUnlockTime(): Promise<number> {
  return (await time.latest()) + ONE_YEAR_IN_SECS;
}

export async function lockFixture(): Promise<{
  lock: Lock;
  unlockTime: number;
  lockedAmount: bigint;
}> {
  const lockedAmount: bigint = ONE_GWEI;
  const unlockTime: number = await getUnlockTime();

  const deployedLock = await ignition.deploy(LockModule, {
    parameters: {
      Lock: {
        unlockTime,
        lockedAmount,
      },
    },
  });
  const lock = deployedLock.lock as unknown as Lock;

  return { lock, unlockTime, lockedAmount };
}
