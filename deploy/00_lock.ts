import { time } from "@nomicfoundation/hardhat-network-helpers";
import type { BigNumberish } from "ethers";
import type { DeployFunction, DeployResult } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

import { preDeploy } from "../utils/contracts";
import { verifyContract } from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, getChainId, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const ONE_YEAR_IN_SECS = time.duration.years(1);
  const ONE_WEI = "1";

  const currentTimestampInSeconds = await time.latest();
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const lockedAmount = ONE_WEI;

  type ConstructorParams = [BigNumberish];
  const args: ConstructorParams = [unlockTime];

  await preDeploy(deployer, "Lock");
  const deployResult: DeployResult = await deploy("Lock", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: args,
    log: true,
    value: lockedAmount.toString(),
    // waitConfirmations: 5,
  });

  // You don't want to verify on localhost
  if (chainId !== "31337" && chainId !== "1337") {
    const contractPath = `contracts/Lock.sol:Lock`;
    await verifyContract({
      contractPath: contractPath,
      contractAddress: deployResult.address,
      args: deployResult.args || [],
    });
  }
};

export default func;
func.id = "deploy_lock";
func.tags = ["Lock"];
