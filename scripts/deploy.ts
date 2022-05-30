import { ethers } from "hardhat";

import { Token, Token__factory } from "../src/types";
import { postDeploy, preDeploy } from "../utils/contracts";
import { toWei } from "../utils/format";
import { getExtraGasInfo } from "../utils/misc";
import { verifyContract } from "../utils/verify";

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  const [owner] = await ethers.getSigners();

  const CONTRACT_NAME = "TestingContract";
  await preDeploy({
    signerAddress: owner.address,
    contractName: CONTRACT_NAME,
  });
  const TokenContract: Token__factory = await ethers.getContractFactory(
    CONTRACT_NAME
  );
  const token: Token = await TokenContract.deploy(
    "TokenName",
    "TCT",
    toWei("6000000"),
    owner.address
  );
  await postDeploy({ contractName: CONTRACT_NAME, contract: token });

  /*
  // If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const contract = await deployContract({
    signer: owner,
    contractName: "TestingContract",
    args: args,
    overrides: {
      value: toWei("1"), // send 1 ether
    },
  });
  */

  /*
  // Mint 100 tokens for user
  const [_, user] = await ethers.getSigners();
  const tx = await contract.connect(user).mint(user.address, toWei("100"));
  const extraGasInfo = await getExtraGasInfo(tx);
  console.log("Minting: ", extraGasInfo);
  */

  // You don't want to verify on localhost
  try {
    if (chainId != 31337 && chainId != 1337) {
      await verifyContract({
        contractName: CONTRACT_NAME,
        contractAddress: token.address,
        args: [],
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
