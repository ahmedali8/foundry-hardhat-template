import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";
import chalk from "chalk";
import { ethers } from "hardhat";

import { fromWei } from "./format";
import { getExtraGasInfo } from "./misc";

export async function getContractIns(
  contractNameOrAbi: string | any[],
  address: string,
  signer: Signer
) {
  return await ethers.getContractAt(contractNameOrAbi, address, signer);
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

// interface DeployContract {
//   signer: SignerWithAddress;
//   contractName: string;
//   args?: Array<any>;
//   overrides?: Record<string, unknown>;
// }

// export async function deployContract({
//   signer,
//   contractName,
//   args = [],
//   overrides,
// }: DeployContract): Promise<Contract> {
//   const { chainId, name } = await ethers.provider.getNetwork();
//   const ethBalance = await etherBalance(signer.address);

//   console.log(
//     ` 🛰  Deploying: ${chalk.cyan(
//       contractName
//     )} to Network: ${name} & ChainId: ${chainId}`
//   );
//   console.log(
//     ` 🎭 Deployer: ${chalk.cyan(signer.address)}, Balance: ${chalk.grey(
//       fromWei(ethBalance ?? 0)
//     )} ETH`
//   );

//   const contractArtifacts: ContractFactory = await getContractFactory(
//     contractName
//   );
//   const contract = await contractArtifacts
//     .connect(signer)
//     .deploy(...args, overrides);
//   await contract.deployed();

//   let extraGasInfo = "";
//   if (contract && contract.deployTransaction) {
//     extraGasInfo = (await getExtraGasInfo(contract.deployTransaction)) ?? "";
//   }

//   console.log(
//     " 📄",
//     chalk.cyan(contractName),
//     "deployed to:",
//     chalk.magenta(contract.address)
//   );
//   console.log(" ⛽", chalk.grey(extraGasInfo));

//   const encoded = abiEncodeArgs(contract, args);
//   if (!encoded || encoded.length <= 2) return contract;
//   await writeFile(`artifacts/${contractName}.address`, contract.address);
//   await writeFile(`artifacts/${contractName}.args`, encoded.slice(2));

//   // await tenderly.persistArtifacts({
//   //   name: contractName,
//   //   address: contract.address,
//   // });

//   return contract;
// }
