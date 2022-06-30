import { execSync } from "child_process";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import path from "path";

import { ensureDirectoryExists, writeFile } from "../utils/files";
import { pascalCase } from "../utils/string";

// e.g. npx hardhat flatfile --contract TestingContract
task("flatfile", "Creates a flattened sol file")
  .addParam("contract", "Contract name")
  .setAction(async (taskArgs: TaskArguments) => {
    const { contract } = taskArgs;

    const output = execSync(`npx hardhat flatten contracts/${contract}.sol`).toString();
    console.log(output);

    const filename = pascalCase(contract);
    const outputFileName = path.join(process.cwd(), `./generated/flattened/${filename}.txt`);
    await ensureDirectoryExists(path.dirname(outputFileName));
    await writeFile(outputFileName, output);

    console.log(`Flattened file export done!`);
  });
