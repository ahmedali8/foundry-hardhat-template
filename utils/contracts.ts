/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import { BaseContract, Contract, Signer } from "ethers";
import { ethers } from "hardhat";

import { fromWei } from "./format";
import { getExtraGasInfo } from "./misc";

/**
 * Gets a contract instance for the given contract name or ABI, address, and signer.
 *
 * @param contractNameOrAbi - The name or ABI of the contract.
 * @param address - The address of the contract.
 * @param signer - The signer to be used for the contract instance.
 * @returns A promise that resolves to the contract instance of type T.
 */
export async function getContractInstance<T extends Contract = Contract>(
  contractNameOrAbi: string | any[],
  address: string,
  signer?: Signer
): Promise<T> {
  return (await ethers.getContractAt(contractNameOrAbi, address, signer)) as T;
}

/**
 * Gets an array of contract instances for the given contract names or ABIs, addresses, and signers.
 *
 * @param contractNameOrAbi - An array of contract names or ABIs.
 * @param addresses - An array of contract addresses.
 * @param signers - An array of signers to be used for the contract instances.
 * @returns A promise that resolves to an array of contract instances of type T, or null if the length of contract names/ABIs, addresses, and signers is different.
 */
export async function getContractInstances<T extends Contract = Contract>(
  contractNameOrAbi: string[] | any[],
  addresses: string[],
  signers?: Signer[]
): Promise<T[] | null> {
  if (
    contractNameOrAbi.length !== addresses.length ||
    (signers && contractNameOrAbi.length !== signers.length)
  ) {
    return null;
  }

  const instances: T[] = [];

  for (let i = 0; i < contractNameOrAbi.length; i++) {
    const name = contractNameOrAbi[i];
    const address = addresses[i];
    const signer = signers ? signers[i] : undefined;

    const ins = await getContractInstance<T>(name, address, signer);
    instances.push(ins);
  }

  return instances;
}

/**
 * Logs information about the signer, network, and balance before deploying a contract.
 *
 * @param signerAddress - The address of the signer.
 * @param contractName - The name of the contract to be deployed.
 * @returns A promise that resolves when the information has been logged.
 */
export async function preDeploy(signerAddress: string, contractName: string): Promise<void> {
  const { chainId, name } = await ethers.provider.getNetwork();
  const ethBalance = await ethers.provider.getBalance(signerAddress);

  console.log(
    ` 🛰  Deploying: ${chalk.cyan(contractName)} to Network: ${name} & ChainId: ${chainId}`
  );
  console.log(
    ` 🎭 Deployer: ${chalk.cyan(signerAddress)}, Balance: ${chalk.grey(
      fromWei(ethBalance ?? 0)
    )} ETH`
  );
}

/**
 * Logs information about the deployment of a contract.
 *
 * @param contractName - The name of the deployed contract.
 * @param contract - The contract instance.
 * @returns A promise that resolves to the contract instance that has been deployed.
 */
export async function postDeploy<T extends BaseContract = BaseContract>(
  contractName: string,
  contract: T
): Promise<T> {
  // Wait for the contract to be deployed
  await contract.waitForDeployment();

  // Get extra gas information of the deployment transaction
  let extraGasInfo = "";
  const deploymentTransaction = contract.deploymentTransaction();

  if (deploymentTransaction) {
    extraGasInfo = (await getExtraGasInfo(deploymentTransaction)) ?? "";
  }

  const contractAddress = await contract.getAddress();

  // Log the deployment information
  console.log(" 📄", chalk.cyan(contractName), "deployed to:", chalk.magenta(contractAddress));
  console.log(" ⛽", chalk.grey(extraGasInfo));

  // Return the contract instance
  return contract;
}
