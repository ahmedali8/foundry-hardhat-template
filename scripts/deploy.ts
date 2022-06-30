import { ethers } from "hardhat";

import { Token, Token__factory } from "../src/types";
import { postDeploy, preDeploy } from "../utils/contracts";
import { toWei } from "../utils/format";
import { getExtraGasInfo } from "../utils/misc";
import { verifyContract } from "../utils/verify";

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  const [owner] = await ethers.getSigners();

  const CONTRACT_NAME = "Token";
  await preDeploy({
    signerAddress: owner.address,
    contractName: CONTRACT_NAME,
  });
  const TokenContract: Token__factory = await ethers.getContractFactory(CONTRACT_NAME);
  const token: Token = await TokenContract.deploy(
    "TokenName",
    "TCT",
    toWei("6000000"),
    owner.address
  );
  await postDeploy({ contractName: CONTRACT_NAME, contract: token });

  /*
  // Mint 100 tokens for user
  const [_, user] = await ethers.getSigners();
  const tx = await token.connect(user).mint(user.address, toWei("100"));
  const extraGasInfo = await getExtraGasInfo(tx);
  console.log("Minting: ", extraGasInfo);
  */

  // You don't want to verify on localhost
  try {
    if (chainId != 31337 && chainId != 1337) {
      const contractPath = `contracts/${CONTRACT_NAME}.sol:${CONTRACT_NAME}`;
      await verifyContract({
        contractPath: contractPath,
        contractAddress: token.address,
        args: ["TokenName", "TCT", toWei("6000000"), owner.address],
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
