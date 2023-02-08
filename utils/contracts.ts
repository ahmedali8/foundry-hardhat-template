/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Signer } from "@ethersproject/abstract-signer";
import type { Contract } from "@ethersproject/contracts";
import chalk from "chalk";
import { ethers } from "hardhat";

import { fromWei } from "./format";
import { getExtraGasInfo } from "./misc";

/**
 * Gets a contract instance for the given contract name or ABI, address, and signer.
 *
 * @param {string | any[]} contractNameOrAbi - The name or ABI of the contract.
 * @param {string} address - The address of the contract.
 * @param {Signer | undefined} signer - The signer to be used for the contract instance.
 * @returns {Promise<T>} A promise that resolves to the contract instance of type T.
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
 * @param {string[] | any[]} contractNameOrAbi - An array of contract names or ABIs.
 * @param {string[]} addresses - An array of contract addresses.
 * @param {Signer[] | undefined} signers - An array of signers to be used for the contract instances.
 * @returns {Promise<T[] | null>} A promise that resolves to an array of contract instances of type T, or null if the length of contract names/ABIs, addresses, and signers is different.
 */
export async function getContractInstances<T extends Contract = Contract>(
  contractNameOrAbi: string[] | any[],
  addresses: string[],
  signers?: Signer[]
): Promise<T[] | null> {
  if (contractNameOrAbi.length !== addresses.length) {
    return null;
  }
  if (signers && contractNameOrAbi.length !== signers.length) {
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
 * @param {Object} options - The options object.
 * @property {string} options.signerAddress - The address of the signer.
 * @property {string} options.contractName - The name of the contract to be deployed.
 * @returns {Promise<void>} A promise that resolves when the information has been logged.
 */
export async function preDeploy({
  signerAddress,
  contractName,
}: {
  signerAddress: string;
  contractName: string;
}): Promise<void> {
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
 * postDeploy is a function that logs the deployment of a contract.
 *
 * @param {Object} options - The options object.
 * @property {string} options.contractName - the name of the deployed contract.
 * @property {T extends Contract} options.contract - the contract instance.
 * @returns {Promise<T>} A promise that resolves to the contract instance that has been deployed.
 */
export async function postDeploy<T extends Contract = Contract>({
  contractName,
  contract,
}: {
  contractName: string;
  contract: T;
}): Promise<T> {
  // Wait for the contract to be deployed
  await contract.deployed();

  // Get extra gas information of the deployment transaction
  let extraGasInfo = "";
  if (contract && contract.deployTransaction) {
    extraGasInfo = (await getExtraGasInfo(contract.deployTransaction)) ?? "";
  }

  // Log the deployment information
  console.log(" 📄", chalk.cyan(contractName), "deployed to:", chalk.magenta(contract.address));
  console.log(" ⛽", chalk.grey(extraGasInfo));

  // Return the contract instance
  return contract;
}
