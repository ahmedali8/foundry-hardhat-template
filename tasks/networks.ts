import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

task("networks", "Prints the list of configured networks").setAction(
  async (_args, hre: HardhatRuntimeEnvironment) => {
    const { userConfig } = hre;
    const networks = userConfig.networks;
    if (!networks) return;

    const networksArray = Object.entries(networks).map((network) => {
      const key = network[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = network[1] as any;

      return {
        networkName: key,
        chainId: value.chainId,
        url: value.url,
      };
    });

    console.table(networksArray);
    console.log("Run network specific command e.g. `npx hardhat accounts --network <networkName>`");
  }
);
