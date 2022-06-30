import { ethers, network } from "hardhat";

export async function resetHardhat() {
  await network.provider.request({
    method: "hardhat_reset",
    params: [],
  });
}

export async function impersonateAccounts(accountsToImpersonate: string[] = []) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [...accountsToImpersonate],
  });
}

export async function getImpersonatingSigner(accountToImpersonate: string) {
  await impersonateAccounts([accountToImpersonate]);
  const signer = await ethers.getSigner(accountToImpersonate);
  return signer;
}
