// biome-ignore-all lint/suspicious/noExplicitAny: no-reason

import { type Contract, type Signer } from "ethers";
import { ethers } from "hardhat";

import { fromWei } from "./format";

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
  signer?: Signer,
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
  signers?: Signer[],
): Promise<T[] | null> {
  if (contractNameOrAbi.length !== addresses.length || (signers && contractNameOrAbi.length !== signers.length)) {
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

  console.log(` 🛰  Deploying: ${contractName} to Network: ${name} & ChainId: ${chainId}`);
  console.log(` 🎭 Deployer: ${signerAddress}, Balance: ${fromWei(ethBalance ?? 0)} ETH`);
}
