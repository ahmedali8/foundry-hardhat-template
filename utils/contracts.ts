import type { Signer } from "@ethersproject/abstract-signer";
import type { Contract } from "@ethersproject/contracts";
import chalk from "chalk";
import { ethers } from "hardhat";

import { fromWei } from "./format";
import { getExtraGasInfo } from "./misc";

export async function getContractInstance<T extends Contract = Contract>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractNameOrAbi: string | any[],
  address: string,
  signer: Signer
): Promise<T> {
  return (await ethers.getContractAt(contractNameOrAbi, address, signer)) as T;
}

export async function getContractInstances<T extends Contract = Contract>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractNameOrAbi: Array<string> | any[],
  addresses: Array<string>,
  signers: Array<Signer>
): Promise<Array<T> | null> {
  if (
    contractNameOrAbi.length !== addresses.length &&
    contractNameOrAbi.length !== signers.length
  ) {
    return null;
  }

  const instances: Array<T> = [] as Array<T>;

  for (let i = 0; i < contractNameOrAbi.length; i++) {
    const name = contractNameOrAbi[i];
    const address = addresses[i];
    const signer = signers[i];

    const ins = await getContractInstance<T>(name, address, signer);
    instances.push(ins);
  }

  return instances;
}

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

export async function postDeploy({
  contractName,
  contract,
}: {
  contractName: string;
  contract: Contract;
}) {
  await contract.deployed();

  let extraGasInfo = "";
  if (contract && contract.deployTransaction) {
    extraGasInfo = (await getExtraGasInfo(contract.deployTransaction)) ?? "";
  }

  console.log(" 📄", chalk.cyan(contractName), "deployed to:", chalk.magenta(contract.address));
  console.log(" ⛽", chalk.grey(extraGasInfo));
  return contract;
}
