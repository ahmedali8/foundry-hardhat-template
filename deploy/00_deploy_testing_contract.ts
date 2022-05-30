import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { preDeploy } from "../utils/contracts";
import { toWei } from "../utils/format";
import { verifyContract } from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, getChainId, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const CONTRACT_NAME = "TestingContract";

  await preDeploy({ signerAddress: deployer, contractName: CONTRACT_NAME });
  const deployResult: DeployResult = await deploy(CONTRACT_NAME, {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: ["testing new created token", "TCT", toWei("6000000"), deployer],
    log: true,
    // waitConfirmations: 5,
  });

  // You don't want to verify on localhost
  try {
    if (chainId !== "31337" && chainId !== "1337") {
      await verifyContract({
        contractName: CONTRACT_NAME,
        contractAddress: deployResult.address,
        args: deployResult.args || [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default func;
func.tags = ["TestingContract"];
